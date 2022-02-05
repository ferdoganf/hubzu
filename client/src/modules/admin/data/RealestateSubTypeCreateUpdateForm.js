import React, { Component } from 'react';
import { Form, Header, Segment, Grid, Button } from 'semantic-ui-react'
import { I18n } from 'react-redux-i18n';

export default class RealestateSubTypeCreateUpdateForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            realEstateTypeCode: this.props.realestateSubTypeCreated ? this.props.realestateSubTypeCreated.realestateTypeCode : null,
            code: this.props.realestateSubTypeCreated ? this.props.realestateSubTypeCreated.code : '',
            forcedName: this.props.realestateSubTypeCreated ? (this.props.realestateSubTypeCreated.forcedName ? this.props.realestateSubTypeCreated.forcedName : I18n.t('label.' + this.props.realestateSubTypeCreated.code)) : '',
            formErrorList: [],
            fieldErrors: {}
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleRadioChange = this.handleRadioChange.bind(this);
    }

    handleInputChange(e) {
        const { id, value } = e.target
        this.setState({ [id]: value });
    }

    handleRadioChange(e, result) {
        const { name, value } = result
        this.setState({ [name]: value });
    }


    preparePageHeader(prevProps, prevState) {

        if (
            prevProps == null || prevState == null ||
            (this.props.code !== prevProps.code) ||
            (this.state.name !== prevState.name)
        ) {
            let sections = [];
            sections.push({ key: 'BCUFbreadcrumb1', content: I18n.t('menu.DATA'), link: true, active: true });

            sections.push({ key: 'BCUFbreadcrumb2', content: I18n.t('menu.REALESTATESUBTYPES') });

            if (this.state.code) {
                sections.push({ key: 'BCUFbreadcrumb3', content: this.state.code });
            }

            if (this.state.name) {
                sections.push({ key: 'BCUFbreadcrumb4', content: this.state.name });
            }

            this.props.setPageHeader(sections);
        }
    }

    componentDidMount() {
        this.preparePageHeader();
    }

    componentDidUpdate(prevProps, prevState) {
        this.preparePageHeader(prevProps, prevState);
    }

    back() {
        this.props.history.push("/admin/data/realestatesubtype/list");
    }

    submit(route) {
        this.setState({ formErrorList: [], fieldErrorList: [] });
        var formErrorList = [];
        var fieldErrors = {};

        let inputList = [
            { field: 'realEstateTypeCode', label: I18n.t("label.REAL_ESTATE_TYPE") },
            { field: 'code', label: I18n.t("label.REAL_ESTATE_SUB_TYPE_CODE") },
            { field: 'forcedName', label: I18n.t("label.REAL_ESTATE_SUB_TYPE_NAME") }
        ];

        inputList.forEach(input => {
            if ((!this.state[input.field]) || (!this.state[input.field].trim())) {
                formErrorList.push(I18n.t('validation.FIELD_CANNOT_BE_EMPTY', { fieldName: input.label }));
                fieldErrors[input.field] = true;
            }
        });

        this.setState({ formErrorList, fieldErrors });
        if (formErrorList.length === 0) {
            let realEstateSubType = {
                realEstateTypeCode: this.state.realEstateTypeCode,
                code: this.state.code,
                forcedName: this.state.forcedName
            }
            this.props.createUpdateAction(route, realEstateSubType);
        } else {
            this.props.showErrorListModal(formErrorList);
        }
    }



    render() {
        return (
            <Segment attached padded='very'>
                <Form>

                    <div>
                        <Header as='h5' dividing>{I18n.t("label.REAL_ESTATE_TYPE")}<span style={{ color: '#DB2828' }}>*</span></Header>
                        <Form.Group inline className='bordered'>
                            {
                                (this.props.realestateMetadata && this.props.realestateMetadata.realEstateTypes) ?
                                    this.props.realestateMetadata.realEstateTypes.map(
                                        realEstateType => {
                                            return (<Form.Radio
                                                key={realEstateType.code}
                                                name='realEstateTypeCode'
                                                checked={this.state.realEstateTypeCode === realEstateType.code}
                                                onChange={this.handleRadioChange}
                                                label={I18n.t('label.' + realEstateType.code)}
                                                value={realEstateType.code}
                                                disabled={this.props.realestateSubTypeCreated ? true : false}
                                            />);
                                        }

                                    )
                                    : null
                            }
                        </Form.Group>
                    </div>

                    <div>
                        <Header as='h5' dividing>{I18n.t("label.REAL_ESTATE_SUB_TYPE_CODE")}<span style={{ color: '#DB2828' }}>*</span></Header>
                        <Form.Group inline className='nonbordered'>
                            <Form.Input style={{ width: '100%' }} disabled={this.props.realestateSubTypeCreated ? true : false} id='code' value={this.state.code} fluid placeholder={I18n.t("label.REAL_ESTATE_SUB_TYPE_CODE")} onChange={this.handleInputChange} error={this.state.fieldErrors.code} />
                        </Form.Group>
                    </div>

                    <div>
                        <Header as='h5' dividing>{I18n.t("label.REAL_ESTATE_SUB_TYPE_NAME")}<span style={{ color: '#DB2828' }}>*</span></Header>
                        <Form.Group inline className='nonbordered'>
                            <Form.Input style={{ width: '100%' }} id='forcedName' value={this.state.forcedName} fluid placeholder={I18n.t("label.REAL_ESTATE_SUB_TYPE_NAME")} onChange={this.handleInputChange} error={this.state.fieldErrors.forcedName} />
                        </Form.Group>
                    </div>
                </Form>
                <Grid padded stackable columns={3}>
                    <Grid.Column floated='left' textAlign='left' width={4}>
                        <Button onClick={() => this.back()} style={{ marginTop: '22px', width: '200px' }} size='medium' secondary type='button' content={I18n.t("button.PREVIOUS_STEP")}></Button>
                    </Grid.Column>
                    <Grid.Column textAlign='center' width={4}>
                    </Grid.Column>
                    <Grid.Column floated='right' textAlign='right' width={8}>
                        <Button onClick={() => this.submit(-1)} style={{ marginTop: '22px', width: '200px' }} size='medium' primary type='button' content={I18n.t("button.SAVE_AND_EXIT")}></Button>
                    </Grid.Column>
                </Grid>
            </Segment>
        );
    }
}