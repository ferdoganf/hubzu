import React, { Component } from 'react';
import { Form, Segment, Grid, Button } from 'semantic-ui-react'
import { I18n } from 'react-redux-i18n';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default class ContractUpdateForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            code: this.props.contract ? this.props.contract.code : '',
            formErrorList: [],
            fieldErrors: {},
            editorHtml: this.props.contract ? this.props.contract.content : ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.insertTag = this.insertTag.bind(this);
        this.submit = this.submit.bind(this);
        this.reactQuillRef = null
    }

    handleChange(html) {
        this.setState({ editorHtml: html });
    }

    preparePageHeader(prevProps, prevState) {

        if (
            prevProps == null || prevState == null ||
            (this.props.code !== prevProps.code)
        ) {
            let sections = [];
            sections.push({ key: 'BCUFbreadcrumb1', content: this.props.menuName ? this.props.menuName : I18n.t('menu.CONTRACT'), link: true, active: true });

            if (this.props.contractName) {
                sections.push({ key: 'BCUFbreadcrumb2', content: this.props.contractName });
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
        this.props.history.push("/admin");
    }

    submit(route) {
        this.setState({ formErrorList: [], fieldErrorList: [] });
        var formErrorList = [];
        var fieldErrors = {};

        /*
        if ((!this.state.editorHtml) || (!this.state.editorHtml.trim())) {
            formErrorList.push(I18n.t('validation.FIELD_CANNOT_BE_EMPTY', { fieldName: I18n.t("label.CONTENT") }));
            fieldErrors['editorState'] = true;
        }
        */

        var html = this.reactQuillRef.makeUnprivilegedEditor(this.reactQuillRef.getEditor()).getHTML();
        this.setState({ editorHtml: html });

        if ((!html) || (!html.trim())) {
            formErrorList.push(I18n.t('validation.FIELD_CANNOT_BE_EMPTY', { fieldName: I18n.t("label.CONTENT") }));
            fieldErrors['editorState'] = true;
        }

        this.setState({ formErrorList, fieldErrors });
        if (formErrorList.length === 0) {
            this.props.createUpdateAction(route, html);
        } else {
            this.props.showErrorListModal(formErrorList);
        }
    }

    insertTag(tag) {
        const cursorPosition = this.reactQuillRef.getEditor().getSelection().index;
        this.reactQuillRef.getEditor().insertText(cursorPosition, tag);
        this.reactQuillRef.getEditor().setSelection(cursorPosition + tag.length);
    }


    render() {
        var icons = ReactQuill.Quill.import("ui/icons");
        icons["ad"] = ' #KULLANICI-AD ';
        icons["soyad"] = ' #KULLANICI-SOYAD ';
        icons["tckn"] = ' #KULLANICI-TCKN ';
        icons["adres"] = ' #KULLANICI-ADRES ';
        icons["eposta"] = ' #KULLANICI-EPOSTA ';
        icons["telefon"] = ' #KULLANICI-TELEFON ';
        icons["ilanno"] = ' #ILAN-NO ';
        icons['ilanil'] = ' #ILAN-IL ';
        icons['ilanilce'] = ' #ILAN-ILCE ';
        icons['ilanmahalle'] = ' #ILAN-MAHALLE ';
        icons['ilanada'] = ' #ILAN-ADA ';
        icons['ilanparsel'] = ' #ILAN-PARSEL ';
        icons['ilanblok'] = ' #ILAN-BLOK ';
        icons['ilankat'] = ' #ILAN-KAT ';
        icons['ilanbolum'] = ' #ILAN-BOLUM ';
        icons['ilanadres'] = ' #ILAN-ADRES ';
        const modules = {
            history: {
                delay: 1000,
                maxStack: 100,
                userOnly: false
            },
            toolbar: {
                container: [
                    ['bold', 'italic', 'underline', 'strike'],       // toggled buttons
                    ['blockquote', 'code-block'],                    // blocks
                    [{ 'header': 1 }, { 'header': 2 }],              // custom button values
                    [{ 'list': 'ordered' }, { 'list': 'bullet' }],    // lists
                    [{ 'script': 'sub' }, { 'script': 'super' }],     // superscript/subscript
                    [{ 'indent': '-1' }, { 'indent': '+1' }],         // outdent/indent
                    [{ 'direction': 'rtl' }],                        // text direction
                    [{ 'size': ['small', false, 'large', 'huge'] }], // custom dropdown
                    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],       // header dropdown
                    [{ 'color': [] }, { 'background': [] }],         // dropdown with defaults
                    [{ 'align': [] }],
                    ['link', 'image'],                              // text align
                    ['clean'],
                    ['ad', 'soyad', 'tckn', 'adres', 'eposta', 'telefon'],
                    ['ilanno', 'ilanil', 'ilanilce', 'ilanmahalle', 'ilanada', 'ilanparsel', 'ilanblok', 'ilankat', 'ilanbolum', 'ilanadres'],
                ],
                handlers: {
                    'ad': () => this.insertTag('#KULLANICI-AD'),
                    'soyad': () => this.insertTag('#KULLANICI-SOYAD'),
                    'tckn': () => this.insertTag('#KULLANICI-TCKN'),
                    'adres': () => this.insertTag('#KULLANICI-ADRES'),
                    'eposta': () => this.insertTag('#KULLANICI-EPOSTA'),
                    'telefon': () => this.insertTag('#KULLANICI-TELEFON'),
                    'ilanno': () => this.insertTag('#ILAN-NO'),
                    'ilanil': () => this.insertTag('#ILAN-IL'),
                    'ilanilce': () => this.insertTag('#ILAN-ILCE'),
                    'ilanmahalle': () => this.insertTag('#ILAN-MAHALLE'),
                    'ilanada': () => this.insertTag('#ILAN-ADA'),
                    'ilanparsel': () => this.insertTag('#ILAN-PARSEL'),
                    'ilanblok': () => this.insertTag('#ILAN-BLOK'),
                    'ilankat': () => this.insertTag('#ILAN-KAT'),
                    'ilanbolum': () => this.insertTag('#ILAN-BOLUM'),
                    'ilanadres': () => this.insertTag('#ILAN-ADRES')
                }
            }

        }

        const formats = [
            'header', 'background', 'color', 'code', 'size',
            'bold', 'italic', 'underline', 'strike', 'blockquote',
            'list', 'bullet', 'indent', 'script', 'align', 'direction',
            'link', 'image', 'code-block', 'formula', 'video'
        ]

        return (
            <Segment attached padded='very' >
                <Form>
                    <div>
                        <ReactQuill ref={(el) => { this.reactQuillRef = el }} theme="snow" value={this.state.editorHtml} modules={modules} formats={formats} />
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