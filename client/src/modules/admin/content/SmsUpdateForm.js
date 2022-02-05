import React, { Component } from 'react';
import { Form, Segment, Grid, Button, Header } from 'semantic-ui-react'
import { I18n } from 'react-redux-i18n';

export default class SmsUpdateForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            code: this.props.sms ? this.props.sms.code : '',
            content: this.props.sms ? this.props.sms.content : '',
            formErrorList: [],
            fieldErrors: {}
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.submit = this.submit.bind(this);
        this.insertTag = this.insertTag.bind(this);
    }

    handleInputChange(e) {
        const { id, value } = e.target
        this.setState({ [id]: value });
    }

    preparePageHeader(prevProps, prevState) {
        if (
            prevProps == null || prevState == null ||
            (this.props.key !== prevProps.key)
        ) {
            let sections = [];
            sections.push({ key: 'BCUFbreadcrumb1', content: I18n.t('menu.SMS'), link: true, active: true });

            if (this.state.code) {
                sections.push({ key: 'BCUFbreadcrumb2', content: I18n.t('label.' + this.state.code) });
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
        this.props.history.push("/admin/sms");
    }

    submit(route) {
        this.setState({ formErrorList: [], fieldErrorList: [] });
        var formErrorList = [];
        var fieldErrors = {};

        if ((!this.state.content) || (!this.state.content.trim())) {
            formErrorList.push(I18n.t('validation.FIELD_CANNOT_BE_EMPTY', { fieldName: I18n.t("label.CONTENT") }));
            fieldErrors.content = true;
        }

        this.setState({ formErrorList, fieldErrors });
        if (formErrorList.length === 0) {
            this.props.createUpdateAction(route, this.state.content);
        } else {
            this.props.showErrorListModal(formErrorList);
        }
    }


    insertTag(tag) {
        let content = this.state.content + ' ' + tag;
        this.setState({ content });
    }


    render() {
        return (
            <Segment attached padded='very' >

                <Form>
                    <div>
                        <Header as='h5' dividing>{I18n.t("label.CONTENT")}</Header>
                        <Form.Group inline className='nonbordered'>
                            <Form.TextArea id='content' value={this.state.content} rows={6} placeholder={I18n.t("label.CONTENT")} onChange={this.handleInputChange} error={this.state.fieldErrors.content} />
                        </Form.Group>
                    </div>
                </Form>
                <div>
                    <Button size='medium' onClick={() => this.insertTag('#{KULLANICI-AD}')}>{"#{KULLANICI-AD}"}</Button>
                    <Button size='medium' onClick={() => this.insertTag('#{KULLANICI-SOYAD}')}>{"#{KULLANICI-SOYAD}"}</Button>
                    <Button size='medium' onClick={() => this.insertTag('#{ILAN-NO}')}>{"#{ILAN-NO}"}</Button>
                    <Button size='medium' onClick={() => this.insertTag('#{ILAN-BASLIGI}')}>{"#{ILAN-BASLIGI}"}</Button>
                    <Button size='medium' onClick={() => this.insertTag('#{CODE}')}>{"#{CODE}"}</Button>
                </div>
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