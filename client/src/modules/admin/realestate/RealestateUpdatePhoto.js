/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { I18n } from 'react-redux-i18n';
import { setPageHeader } from '../../../actions/page/Actions';
import { Segment, Grid, Button, Card, Image, Icon } from 'semantic-ui-react'
import RealestateCreateUpdateStep from './RealestateCreateUpdateStep'
import { showErrorListModal, showErrorModal } from '../../../actions/page/Actions';
import { showLoading, hideLoading } from '../../../actions/page/Actions';
import { getRealestate, realestateRedirect, uploadPhoto, uploadPhotoStart, deletePhoto } from '../../../actions/realestate/Actions';
import FileBase64 from '../../../components/input/FileBase64';

class RealestateUpdatePhoto extends Component {
    constructor(props) {
        super(props);
        this.state = {
            realestateCode: null,
            route: null,
            files: [],
            deletedFiles: []
        };
        this.removeFile = this.removeFile.bind(this);
        this.submit = this.submit.bind(this);
        this.fileInputRef = React.createRef();
    }

    preparePageHeader(prevProps, prevState) {
        if (this.props.realestateCreated) {
            if (
                prevProps == null || prevState == null ||
                (this.props.lastResponseId !== prevProps.lastResponseId) ||
                (!prevProps.realestateCreated) ||
                (!prevProps.realestateCreated.realEstateAddress) ||
                (!prevProps.realestateCreated.realEstateAddress.city) ||
                (!prevProps.realestateCreated.realEstateAddress.district) ||
                (this.props.realestateCreated.code !== prevProps.realestateCreated.code) ||
                (this.props.realestateCreated.bank !== prevProps.realestateCreated.bank) ||
                (this.props.realestateCreated.realEstateType !== prevProps.realestateCreated.realEstateType) ||
                (this.props.realestateCreated.realEstateSubType !== prevProps.realestateCreated.realEstateSubType) ||
                ((this.props.realestateCreated.realEstateAddress && this.props.realestateCreated.realEstateAddress.city && (this.props.realestateCreated.realEstateAddress.city.code !== prevProps.realestateCreated.realEstateAddress.city.code))) ||
                ((this.props.realestateCreated.realEstateAddress && this.props.realestateCreated.realEstateAddress.district && (this.props.realestateCreated.realEstateAddress.district.code !== prevProps.realestateCreated.realEstateAddress.district.code)))
            ) {
                let sections = [];
                sections.push({ key: 'RUPbreadcrumb1', content: I18n.t('menu.REALESTATE'), link: true, active: true });
                sections.push({ key: 'RUPbreadcrumb2', content: this.props.realestateCreated.code });

                if (this.props.realestateCreated.bank) {
                    sections.push({ key: 'RUPbreadcrumb3', content: this.props.realestateCreated.bank.name });
                }

                if (this.props.realestateCreated && this.props.realestateCreated.realEstateType) {
                    sections.push({ key: 'RUPbreadcrumb4', content: I18n.t('label.' + this.props.realestateCreated.realEstateType.code) });
                }

                if (this.props.realestateCreated && this.props.realestateCreated.realEstateSubType) {
                    sections.push({ key: 'RUPbreadcrumb5', content: I18n.t('label.' + this.props.realestateCreated.realEstateSubType.code) });
                }

                if (this.props.realestateCreated && this.props.realestateCreated && this.props.realestateCreated.realEstateAddress.city) {
                    sections.push({ key: 'RUPbreadcrumb6', content: this.props.realestateCreated.realEstateAddress.city.name });
                }

                if (this.props.realestateCreated && this.props.realestateCreated.realEstateAddress && this.props.realestateCreated.realEstateAddress.district) {
                    sections.push({ key: 'RUPbreadcrumb7', content: this.props.realestateCreated.realEstateAddress.district.name });
                }
                this.props.setPageHeader(sections);
            }
        }
    }

    componentDidMount() {
        this.preparePageHeader(null, null);

        let code = null;
        if (this.props.match.params.code) {
            code = this.props.match.params.code.toString();
            if (code) {
                this.setState({ realestateCode: code });
            }
        }
        if (!code) {
            this.props.history.push("/admin/realestate/create");
        } else {
            this.props.getRealestate(code);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        console.log(this.props.fileUploadException);
        if (this.props.shouldRedirect && this.state.files && this.state.deletedFiles && this.props.fileUploadException) {
            this.props.hideLoading();
            this.props.showErrorModal(I18n.t('error.ERROR_GENERAL'));
            this.props.realestateRedirect(false);
            this.props.uploadPhotoStart();
        }
        else if (this.props.shouldRedirect && this.state.files && this.state.deletedFiles && ((this.state.files.length + this.state.deletedFiles.length) === this.props.uploadedFileNumber)) {
            this.props.hideLoading();
            //shouldRedirect
            this.props.realestateRedirect(false);
            this.props.uploadPhotoStart();
            if (this.state.route === 1) {
                this.props.history.push('/admin/realestate/' + this.state.realestateCode + '/publish');
            } else {
                this.props.history.push("/admin/realestate/list");

            }
        } else {
            this.preparePageHeader(prevProps, prevState);
        }
    }

    removeFile(key) {
        let files = this.state.files;
        files = files.filter(function (el) { return el.key !== key });
        this.setState({ files })
    }

    removeFileCreated(code) {
        let deletedFiles = this.state.deletedFiles;
        let found = deletedFiles.find(e => (e && e.code === code));
        if (!found) {
            deletedFiles.push(code);
            this.setState({ deletedFiles })
        }
    }

    getFiles(files) {
        let currentFiles = this.state.files;
        for (let i = 0; i < files.length; i++) {
            let found = currentFiles.find(e => (e && e.key === files[i].key));
            if (!found) {
                currentFiles.push(files[i]);
            }
        }
        this.setState({ files: currentFiles })
    }

    back() {
        this.props.history.push("/admin/realestate/" + this.state.realestateCode + '/address');
    }

    submit(route) {
        this.props.uploadPhotoStart();
        this.setState({ formErrorList: [], fieldErrorList: [] });
        var formErrorList = [];
        var fieldErrors = {};

        if (this.props.realestateCreated) {
            this.setState({ formErrorList, fieldErrors });
            if (formErrorList.length === 0) {

                let files = this.state.files;
                let deletedFiles = this.state.deletedFiles;

                if (files.length > 0 || deletedFiles.length > 0) {

                    this.props.showLoading();

                    for (let i = 0; i < deletedFiles.length; i++) {
                        this.setState({
                            route
                        }, () => {
                            this.props.deletePhoto(this.state.realestateCode, deletedFiles[i]);
                        });
                    }

                    for (let i = 0; i < files.length; i++) {
                        let request = {
                            file: files[i].base64,
                            fileName: files[i].name
                        }
                        this.setState({
                            route
                        }, () => {
                            this.props.uploadPhoto(this.state.realestateCode, request);
                        });
                    }
                } else {
                    this.props.realestateRedirect(false);
                    this.props.history.push('/admin/realestate/' + this.state.realestateCode + '/publish');
                }
            } else {
                this.props.showErrorListModal(formErrorList);
            }
        }
    }

    render() {
        return (
            <div className='admin' >
                <RealestateCreateUpdateStep step='photo' />
                <Segment attached padded='very'>
                    <Segment textAlign='center' basic>

                        <Card.Group itemsPerRow={4}>
                            {(this.state.files || []).map(file => (
                                <Card key={file.key}>
                                    <Image src={file.url} wrapped ui={false} />
                                    <Card.Content>
                                        <Card.Meta>{file.name} - {Math.round(file.size / 1000) + ' kB'}</Card.Meta>
                                    </Card.Content>
                                    <Card.Content extra>
                                        <a href='#' onClick={() => this.removeFile(file.key)}>
                                            <Icon name='trash' />
                                            {I18n.t('label.DELETE')}
                                        </a>
                                    </Card.Content>
                                </Card>
                            ))}


                            {this.props.realestateCreated ? (this.props.realestateCreated.photos || [])
                                .filter(file => !this.state.deletedFiles.includes(file.code))
                                .map(file => (
                                    <Card key={file.code}>
                                        <Image src={'/assets/cdn' + file.path + '/' + file.fileName} wrapped ui={false} />
                                        <Card.Content>
                                            <Card.Meta>{file.fileName} - {Math.round(file.size / 1000) + ' kB'}</Card.Meta>
                                        </Card.Content>
                                        <Card.Content extra>
                                            <a href='#' onClick={() => this.removeFileCreated(file.code)}>
                                                <Icon name='trash' />
                                                {I18n.t('label.DELETE')}
                                            </a>

                                        </Card.Content>
                                    </Card>
                                )) : null}
                        </Card.Group>
                    </Segment>

                    <Grid padded stackable columns={3}>
                        <Grid.Column floated='left' textAlign='left'>
                            <Button onClick={() => this.back()} style={{ marginTop: '22px', width: '200px' }} size='medium' secondary type='button' content={I18n.t("button.PREVIOUS_STEP")}></Button>
                        </Grid.Column>
                        <Grid.Column textAlign='center'>
                            <FileBase64
                                multiple={true}
                                onDone={this.getFiles.bind(this)} style={{ marginTop: '22px', width: '200px' }} />
                        </Grid.Column>
                        <Grid.Column floated='right' textAlign='right'>
                            <Button onClick={() => this.submit(-1)} style={{ marginTop: '22px', width: '200px' }} size='medium' primary type='button' content={I18n.t("button.SAVE_AND_EXIT")}></Button>
                            <Button onClick={() => this.submit(1)} style={{ marginTop: '22px', width: '200px' }} size='medium' primary type='button' content={I18n.t("button.SAVE_AND_CONTINUE")}></Button>
                        </Grid.Column>
                    </Grid>
                </Segment>
            </div>
        );
    }
}


const mapStateToProps = state => {
    const { lastResponseId } = state.pageReducer;
    const { user } = state.sessionReducer;
    const { realestateCreated, shouldRedirect, uploadedFileNumber, fileUploadException } = state.realestateReducer;

    return {
        lastResponseId,
        user,
        realestateCreated,
        shouldRedirect,
        uploadedFileNumber,
        fileUploadException
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            setPageHeader,
            showErrorListModal,
            showErrorModal,
            getRealestate,
            realestateRedirect,
            uploadPhoto,
            uploadPhotoStart,
            deletePhoto,
            showLoading,
            hideLoading
        },
        dispatch
    );
};

const hoc = connect(mapStateToProps, mapDispatchToProps)(RealestateUpdatePhoto);

export { hoc as RealestateUpdatePhoto };
