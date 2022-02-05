import React from "react";
import { I18n } from 'react-redux-i18n';
import { Segment, Grid, Form, Menu, Header } from 'semantic-ui-react'
import RealEstateGridRow from './RealEstateGridRow';
import { Link } from 'react-router-dom';


export default class RealestatePublicSearchPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            realEstateType: null,
            residentialType: null,
            commercialType: null,
            landType: null,
            searchString: '',
            city: null,
            district: null,
            pageNo: 1,
            pageSize: 1000,
            orderBy: 'id',
            orderType: 'desc',
            anySearch: false,
            timer: null,
            user: null,
            searchTimer: null
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleDropdownChange = this.handleDropdownChange.bind(this);
        this.handleDropdownChangeCity = this.handleDropdownChangeCity.bind(this);
        this.handleDropdownChangeDistrict = this.handleDropdownChangeDistrict.bind(this);
        this.handleDropdownChangeRealEstateType = this.handleDropdownChangeRealEstateType.bind(this);

        this.addToFavorites = this.addToFavorites.bind(this);
        this.removeFromFavorites = this.removeFromFavorites.bind(this);
        this.getRealestates = this.getRealestates.bind(this);
    }

    componentDidMount() {

        this.props.getSelectedBank();

        if (this.props.realestateMetadata === null) {
            this.props.getRealestateMetadata();
        }

        if (this.props.cities === null) {
            this.props.getCities();
        }

        if (!this.props.searchString) {
            this.getRealestates();
        } else {
            this.setState({ searchString: this.props.searchString }, function () {
                this.getRealestates();
            });
        }

        if (this.props.user && (this.props.user.userType === 'BUYER' || this.props.user.userType === 'VISITOR')) {
            this.props.getFavoritesOfUser();
        }
        let timer = setInterval(this.props.getSystemDate, 1000);
        this.setState({ timer });

        let searchTimer = setInterval(this.getRealestates, 10000);
        this.setState({ searchTimer });

        /*
        if (!this.props.selectedBank && (!this.props.banks || this.props.banks.length === 0)) {
            this.props.getAllBanks();
        }
        */

        if (!this.props.selectedBank) {
            this.props.getAllBanks();
        }
    }

    componentWillUnmount() {
        clearInterval(this.state.timer);
        clearInterval(this.state.searchTimer);
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.user && !prevProps.user && !this.state.user && (this.props.user.userType === 'BUYER' || this.props.user.userType === 'VISITOR')) {
            this.setState({ user: this.props.user });
            this.props.getFavoritesOfUser();
        }

        if ((!prevProps.searchString && this.props.searchString) || (prevProps.searchString !== this.props.searchString)) {
            this.setState({ searchString: this.props.searchString }, function () {
                this.getRealestates();
            });
        }
    }

    addToFavorites(realestateCode) {
        if (!this.props.user) {
            this.props.showErrorModal(I18n.t("validation.SIGNED_IN_TO_ADD_FAVORITE"), '/signin');
        } else {
            if (this.props.user.userType !== 'BUYER' && this.props.user.userType !== 'VISITOR') {
                this.props.showErrorModal(I18n.t("validation.BE_BUYER_TO_ADD_FAVORITE"));
            } else {
                this.props.addToFavorites(realestateCode);
            }
        }
    }

    removeFromFavorites(realestateCode) {
        if (!this.props.user) {
            this.props.showErrorModal(I18n.t("validation.SIGNED_IN_TO_REMOVE_FAVORITE"), '/signin');
        } else {
            if (this.props.user.userType !== 'BUYER' && this.props.user.userType !== 'VISITOR') {
                this.props.showErrorModal(I18n.t("validation.BE_BUYER_TO_REMOVE_FAVORITE"));
            } else {
                this.props.removeFromFavorites(realestateCode);
            }
        }
    }

    getRealestates() {

        let onlyOccasions = null;
        if (this.props.onlyOccasions) {
            onlyOccasions = true;
        }

        let realEstateStatus = null;
        if (this.props.realEstateStatus) {
            realEstateStatus = this.props.realEstateStatus;
        }

        this.props.searchRealestatePublic({
            realEstateType: this.state.realEstateType,
            searchString: this.state.searchString,
            residentialType: this.state.residentialType,
            commercialType: this.state.commercialType,
            landType: this.state.landType,
            city: this.state.city,
            district: this.state.district,
            onlyOccasions: onlyOccasions,
            realEstateStatus: realEstateStatus,
            pageNo: this.state.pageNo,
            pageSize: this.state.pageSize,
            orderBy: this.state.orderBy,
            orderType: this.state.orderType
        }, true);
        this.setState({ anySearch: true });
    }


    handleInputChange(e) {
        const { id, value } = e.target
        this.setState({ [id]: value });
    }

    handleDropdownChange(e, result) {
        const { id, value } = result
        this.setState({ [id]: value }, () => {
            this.getRealestates()
        });
    }

    onKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.getRealestates();
        }
    }

    handleDropdownChangeCity(e, result) {
        this.setState({ district: null });
        const { value } = result
        if (!this.props.districts[value]) {
            this.props.getDistricts(value);
        }
        this.handleDropdownChange(e, result);
    }

    handleDropdownChangeDistrict(e, result) {
        this.handleDropdownChange(e, result);
    }

    handleDropdownChangeRealEstateType(e, result) {
        this.setState({ residentialType: null, commercialType: null, landType: null });
        this.handleDropdownChange(e, result);
    }



    render() {
        let realEstateTypes = []
        if (this.props.realestateMetadata) {
            realEstateTypes = this.props.realestateMetadata.realEstateTypes.map(item => Object.assign({}, { key: item.code, text: I18n.t('label.' + item.code), value: item.code }));
            realEstateTypes.unshift({ key: null, text: I18n.t('label.ALL'), value: null });
        }

        let cities = [];
        if (this.props.cities) {
            cities = this.props.cities.map(city => Object.assign({}, { key: city.code, text: city.name, value: city.code }));
            cities.unshift({ key: null, text: I18n.t('label.ALL'), value: null });
        }

        let districts = [];
        if (this.state.city && this.props.districts && this.props.districtsVersion > 0) {
            if (this.props.districts[this.state.city]) {
                districts = this.props.districts[this.state.city].map(district => Object.assign({}, { key: district.code, text: district.name, value: district.code }));
            }
            districts.unshift({ key: null, text: I18n.t('label.ALL'), value: null });
        }


        let residentialTypes = []
        if (this.props.realestateMetadata) {
            residentialTypes = this.props.realestateMetadata.residentialTypes.map(item => Object.assign({}, { key: item.code, text: I18n.t('label.' + item.code), value: item.code }));
            residentialTypes.unshift({ key: null, text: I18n.t('label.ALL'), value: null });
        }

        let commercialTypes = []
        if (this.props.realestateMetadata) {
            commercialTypes = this.props.realestateMetadata.commercialTypes.map(item => Object.assign({}, { key: item.code, text: I18n.t('label.' + item.code), value: item.code }));
            commercialTypes.unshift({ key: null, text: I18n.t('label.ALL'), value: null });
        }

        let landTypes = []
        if (this.props.realestateMetadata) {
            landTypes = this.props.realestateMetadata.landTypes.map(item => Object.assign({}, { key: item.code, text: I18n.t('label.' + item.code), value: item.code }));
            landTypes.unshift({ key: null, text: I18n.t('label.ALL'), value: null });
        }

        let realestates = [];
        if (this.props.realestates) {
            if (this.props.favoritesFilter) {
                if (this.props.userFavorites && this.props.userFavorites.length > 0) {
                    realestates = this.props.realestates.filter(a => this.props.userFavorites.some(b => a.code === b.code));
                }
            } else {
                realestates = this.props.realestates;
            }
        }

        //console.log(this.props.selectedBank);

        return (
            <Segment basic style={{ padding: '0px' }}>
                <Grid>
                    <Grid.Row >
                        <Grid.Column mobile={16} tablet={16} computer={4}>
                            <Segment basic padded='very' style={{ paddingTop: '10px' }}>
                                <Form size='large'>
                                    <Form.Group>
                                        <div style={{
                                            border: '1px solid rgba(34, 36, 38, 0.15)',
                                            borderRadius: '0.33333333rem',
                                            backgroundColor: 'white',
                                            textAlign: 'center',
                                            margin: "6px"
                                        }} >
                                            {
                                                this.props.selectedBank ?
                                                    <img src={"/assets/banks/" + this.props.selectedBank.code + ".jpg"} alt={this.props.selectedBank.code} width="50%" />
                                                    : null
                                            }
                                        </div>
                                    </Form.Group>
                                    <Form.Group style={{ paddingTop: '5px' }}>
                                        <Form.Input
                                            id='searchString'
                                            name='searchString'
                                            width={16}
                                            fluid
                                            placeholder={I18n.t("label.REALESTATE_KEYWORD")}
                                            label={I18n.t("label.REALESTATE_KEYWORD")}
                                            value={this.state.searchString}
                                            onChange={this.handleInputChange}
                                            onKeyPress={this.onKeyPress} />
                                    </Form.Group>
                                    <Form.Group style={{ paddingTop: '5px' }}>
                                        <Form.Select
                                            onKeyPress={this.onKeyPress}
                                            name='realEstateType'
                                            id='realEstateType'
                                            value={this.state.realEstateType}
                                            onChange={this.handleDropdownChangeRealEstateType}
                                            width={16}
                                            fluid
                                            placeholder={I18n.t("label.ALL")}
                                            label={I18n.t("label.REAL_ESTATE_TYPE")}
                                            selection
                                            options={realEstateTypes}
                                        />
                                    </Form.Group>
                                    {
                                        this.state.realEstateType && this.state.realEstateType === 'RESIDENTIAL' ?
                                            <Form.Group style={{ paddingTop: '5px' }}>
                                                <Form.Select
                                                    onKeyPress={this.onKeyPress}
                                                    name='residentialType'
                                                    id='residentialType'
                                                    value={this.state.residentialType}
                                                    onChange={this.handleDropdownChange}
                                                    width={16}
                                                    fluid
                                                    placeholder={I18n.t("label.ALL")}
                                                    label={I18n.t("label.RESIDENTIAL_TYPE")}
                                                    selection
                                                    options={residentialTypes}
                                                />
                                            </Form.Group>
                                            : null
                                    }

                                    {
                                        this.state.realEstateType && this.state.realEstateType === 'COMMERCIAL' ?
                                            <Form.Group style={{ paddingTop: '5px' }}>
                                                <Form.Select
                                                    onKeyPress={this.onKeyPress}
                                                    name='commercialType'
                                                    id='commercialType'
                                                    value={this.state.commercialType}
                                                    onChange={this.handleDropdownChange}
                                                    width={16}
                                                    fluid
                                                    placeholder={I18n.t("label.ALL")}
                                                    label={I18n.t("label.COMMERCIAL_TYPE")}
                                                    selection
                                                    options={commercialTypes}
                                                />
                                            </Form.Group>
                                            : null
                                    }

                                    {
                                        this.state.realEstateType && this.state.realEstateType === 'LAND' ?
                                            <Form.Group style={{ paddingTop: '5px' }}>
                                                <Form.Select
                                                    onKeyPress={this.onKeyPress}
                                                    name='landType'
                                                    id='landType'
                                                    value={this.state.landType}
                                                    onChange={this.handleDropdownChange}
                                                    width={16}
                                                    fluid
                                                    placeholder={I18n.t("label.ALL")}
                                                    label={I18n.t("label.LAND_TYPE")}
                                                    selection
                                                    options={landTypes}
                                                />
                                            </Form.Group>
                                            : null
                                    }

                                    <Form.Group style={{ paddingTop: '5px' }}>
                                        <Form.Select
                                            id='city'
                                            name='city'
                                            onKeyPress={this.onKeyPress}
                                            fluid
                                            width={16}
                                            options={cities}
                                            placeholder={I18n.t("label.ALL")}
                                            label={I18n.t("label.CITY")}
                                            value={this.state.city}
                                            onChange={this.handleDropdownChangeCity}
                                        />
                                    </Form.Group>
                                    <Form.Group style={{ paddingTop: '5px' }}>
                                        <Form.Select
                                            id='district'
                                            name='district'
                                            onKeyPress={this.onKeyPress}
                                            fluid
                                            width={16}
                                            options={districts}
                                            placeholder={I18n.t("label.ALL")}
                                            label={I18n.t("label.DISTRICT")}
                                            value={this.state.district}
                                            onChange={this.handleDropdownChangeDistrict}
                                        />
                                    </Form.Group>
                                </Form>
                            </Segment>

                            {
                                this.props.selectedBank ?
                                    null
                                    : this.props.banks && this.props.banks.length > 0 ?
                                        <Segment basic padded='very' style={{ paddingTop: '10px' }}> {
                                            this.props.banks
                                                .map(bank => {
                                                    return (
                                                        <Header size='tiny' key={bank.code}>
                                                            <a target="_blank" rel="noopener noreferrer" href={window.location.protocol + '//' + bank.code + '.' + window.location.host} >{bank.name}</a>
                                                        </Header>
                                                    );
                                                })
                                        }
                                        </Segment>
                                        : null
                            }
                        </Grid.Column>
                        <Grid.Column mobile={16} tablet={16} computer={12}>
                            {!this.props.favoritesFilter ?
                                <div className="searchMenuTitles">
                                    <Menu compact stackable>
                                        <Menu.Item as={Link} to="/home" active={this.props.activeMenuItem === '/home'}>
                                            {I18n.t('menu.ALL_REAL_ESTATE')}
                                        </Menu.Item>

                                        <Menu.Item as={Link} to="/realestates/started" active={this.props.activeMenuItem === '/realestates/started'}>
                                            {I18n.t('menu.REALESTATE_STARTED_REAL_ESTATE')}
                                        </Menu.Item>

                                        <Menu.Item as={Link} to="/realestates/latest" active={this.props.activeMenuItem === '/realestates/latest'}>
                                            {I18n.t('menu.LATESTS_REAL_ESTATE')}
                                        </Menu.Item>

                                        <Menu.Item as={Link} to="/realestates/occasion" active={this.props.activeMenuItem === '/realestates/occasion'}>
                                            {I18n.t('menu.OCCASION_REAL_ESTATE')}
                                        </Menu.Item>
                                        {
                                            (this.props.selectedBank && !this.props.selectedBank.finishedAuctionsShown) ?
                                                null :
                                                <Menu.Item as={Link} to="/realestates/finished" active={this.props.activeMenuItem === '/realestates/finished'}>
                                                    {I18n.t('menu.FINISHED_REAL_ESTATE')}
                                                </Menu.Item>
                                        }
                                    </Menu>
                                </div> : null
                            }
                            {
                                this.state.anySearch ?
                                    realestates && realestates.length > 0 ?
                                        <Grid>
                                            {
                                                realestates
                                                    .map(realestate => {
                                                        return (
                                                            <RealEstateGridRow
                                                                key={realestate.id}
                                                                realestate={realestate}
                                                                history={this.props.history}
                                                                addToFavorites={this.addToFavorites}
                                                                removeFromFavorites={this.removeFromFavorites}
                                                                setBid={this.setBid}
                                                                systemDate={this.props.systemDate}
                                                                favorited={this.props.userFavorites ? this.props.userFavorites.find(e => e.code === realestate.code) : false}
                                                                favoritesFilter={this.props.favoritesFilter}
                                                            />
                                                        );
                                                    })
                                            }
                                        </Grid>
                                        : null
                                    :
                                    null
                            }
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
        );
    }
}