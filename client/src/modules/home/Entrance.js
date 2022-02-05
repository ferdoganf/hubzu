import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import { bindActionCreators } from 'redux';
import { getRealestateMetadata, getSystemDate, getSelectedBank, getAllBanks } from '../../actions/metadata/Actions';
import { showErrorListModal, setPageHeader, showErrorModal } from '../../actions/page/Actions';
import { searchRealestatePublic } from '../../actions/realestate/Actions';
import { Segment, Form, Button, Grid, Header } from 'semantic-ui-react'
import { I18n } from 'react-redux-i18n';
import { Link } from 'react-router-dom';

//import background from "/assets/images/entrance.jpg";

class Entrance extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchString: null
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
        this.submit = this.submit.bind(this);
    }


    componentDidMount() {
        this.props.getAllBanks();
        this.props.getSelectedBank();
    }

    handleInputChange(e) {
        const { id, value } = e.target
        this.setState({ [id]: value });
    }

    onKeyPress = (e) => {
        if (e.key === 'Enter') {
            if (this.state.searchString && this.state.searchString.length > 0) {
                this.props.history.push("/home/" + this.state.searchString);
            } else {
                this.props.history.push("/home");
            }
        }
    }

    submit() {
        if (this.state.searchString && this.state.searchString.length > 0) {
            this.props.history.push("/home/" + this.state.searchString);
        } else {
            this.props.history.push("/home");
        }
    }

    render() {
        if (!this.props.selectedBank)
            return (
                <div>
                    <div style={{
                        backgroundImage: `url("/assets/images/entrance.jpg")`,
                        height: "800px",
                        backgroundSize: "cover"
                    }}>
                        <Segment padded basic style={{ paddingTop: "300px" }}>
                            <Segment padded basic className="miny" textAlign="center">
                                <Form size='large'>
                                    <Form.Group style={{ paddingTop: '5px' }}>
                                        <Form.Input
                                            id='searchString'
                                            name='searchString'
                                            width={16}
                                            fluid
                                            placeholder={I18n.t("label.REALESTATE_KEYWORD_FULL")}
                                            value={this.state.searchString}
                                            onChange={this.handleInputChange}
                                            onKeyPress={this.onKeyPress} />
                                        <Button style={{ width: "160px", marginTop: "0px" }} primary size="big" onClick={() => this.submit()}>
                                            {I18n.t('button.SEARCH')}
                                        </Button>
                                    </Form.Group>
                                </Form>
                            </Segment>
                        </Segment>
                    </div >
                    <div style={{
                        backgroundImage: `url("/assets/images/entrance2.jpeg")`,
                        height: "800px",
                        backgroundSize: "cover"
                    }}>
                        <Segment padded basic >
                            <Grid>
                                <Grid.Row style={{ paddingTop: "80px" }}>
                                    {
                                        this.props.banks && this.props.banks.length > 0 ?
                                            <Grid columns={6} padded>
                                                {
                                                    this.props.banks
                                                        .map(bank => {
                                                            return (
                                                                <Grid.Column key={bank.code}>
                                                                    <a target="_blank" rel="noopener noreferrer" href={window.location.protocol + '//' + bank.code + '.' + window.location.host.replace('www.', '')} >
                                                                        <img src={"/assets/banks/" + bank.code + ".jpg"} alt={bank.name} width="80%" />
                                                                    </a>
                                                                </Grid.Column>
                                                            );
                                                        })
                                                }
                                            </Grid>
                                            : null
                                    }
                                </Grid.Row>
                                <Grid.Row style={{ paddingTop: "300px" }}>
                                    <Grid.Column mobile={16} tablet={16} computer={4}>
                                        <Link to="/aboutus"><Header size='huge'>Biz Kimiz</Header></Link>
                                        <br /><br />
                                        <Link to="/whatwedo"><Header size='huge'>Ne Yapıyoruz</Header></Link>
                                        <br /><br />
                                        <Link to="/how"><Header size='huge'>Gayrimenkulü Nasıl Edinirim?</Header></Link>
                                    </Grid.Column>
                                    <Grid.Column mobile={16} tablet={16} computer={6}></Grid.Column>
                                    <Grid.Column mobile={16} tablet={16} computer={6}>

                                        <Header size='huge'>HUBZU</Header>
                                        <br />
                                        <Header size='large'>
                                            BİLİŞİM VADİSİ
                                            <br />
                                            MUALLİMKÖY MAH. DENİZ CAD. MUALLİMKÖY
                                            <br />
                                            T.G.B. 1.ETAP 1.1.C1 BLOK  NO: 143 /8 İÇ KAPI NO: Z01
                                            <br />GEBZE/ KOCAELİ
                                        </Header>
                                        <br />
                                        <a href="mailto: info@gmail.com"><Header size='huge'>info@gmail.com</Header></a>


                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Segment>
                    </div >
                </div>
            );
        else
            return (
                <Redirect to={{ pathname: '/home' }} />
            );
    }
}


const mapStateToProps = state => {
    const { lastResponseId } = state.pageReducer;
    const { user } = state.sessionReducer;
    const { realestates, realestateCount } = state.realestateReducer;
    const { realestateMetadata, systemDate, selectedBank, banks } = state.metadataReducer;
    const { userFavorites } = state.userReducer;
    const { activeMenuItem } = state.pageReducer;

    return {
        lastResponseId,
        user,
        realestateMetadata,
        realestates,
        realestateCount,
        systemDate,
        userFavorites,
        selectedBank,
        activeMenuItem,
        banks
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            setPageHeader,
            getRealestateMetadata,
            showErrorListModal,
            searchRealestatePublic,
            getSystemDate,
            getSelectedBank,
            showErrorModal,
            getAllBanks
        },
        dispatch
    );
};

const hoc = connect(mapStateToProps, mapDispatchToProps)(Entrance);

export { hoc as Entrance };
