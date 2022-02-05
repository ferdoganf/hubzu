import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { I18n } from 'react-redux-i18n';
import { Segment, Table, Dropdown, Message } from 'semantic-ui-react'
import { setPageHeader } from '../../../actions/page/Actions';
import { showErrorListModal } from '../../../actions/page/Actions';
import { getSmsList } from '../../../actions/metadata/Actions';

class SmsList extends Component {

    preparePageHeader(prevProps, prevState) {

        if (
            prevProps == null || prevState == null
        ) {
            let sections = [];
            sections.push({ key: 'BCUFbreadcrumb1', content: I18n.t('menu.SMS_CONTENT'), link: true, active: true });
            this.props.setPageHeader(sections);
        }
    }

    componentDidMount() {
        this.props.getSmsList();
        this.preparePageHeader();
    }

    render() {
        return (
            <div className='admin'>
                <Segment attached padded='very'>

                    {
                        (this.props.smsList && (this.props.smsList.length > 0)) ?
                            <div>
                                <Table striped selectable>
                                    <Table.Header>
                                        <Table.Row>
                                            <Table.HeaderCell>
                                            </Table.HeaderCell>
                                            <Table.HeaderCell>
                                                {I18n.t("label.DESCRIPTION")}
                                            </Table.HeaderCell>
                                            <Table.HeaderCell>
                                                {I18n.t("label.CONTENT")}
                                            </Table.HeaderCell>
                                        </Table.Row>
                                    </Table.Header>
                                    <Table.Body>
                                        {this.props.smsList
                                            .map(sms => {
                                                return (
                                                    <Table.Row key={sms.code}>
                                                        <Table.Cell singleLine style={{ overflow: 'visible' }}>
                                                            <Dropdown text={I18n.t("label.ACTION_BUTTON")} icon='content' floating labeled button className='icon' style={{ padding: '.58928571em 1.125em .58928571em' }}>
                                                                <Dropdown.Menu>
                                                                    <Dropdown.Item text={I18n.t("label.UPDATE")} onClick={() => this.props.history.push("/admin/sms/" + sms.code)} />
                                                                </Dropdown.Menu>
                                                            </Dropdown>
                                                        </Table.Cell>
                                                        <Table.Cell>{I18n.t("label." + sms.code)}</Table.Cell>
                                                        <Table.Cell>{sms.content}</Table.Cell>
                                                    </Table.Row>
                                                );
                                            })}
                                    </Table.Body>
                                </Table>
                            </div>
                            :
                            <Message
                                warning
                                content={I18n.t("msg.ACTION_SEARCH_RESULT_EMPTY")}
                            />
                    }
                </Segment>
            </div >
        );
    }

}

const mapStateToProps = state => {

    const { lastResponseId } = state.pageReducer;
    const { user } = state.sessionReducer;
    const { smsList } = state.metadataReducer;
    return {
        lastResponseId,
        user,
        smsList
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            setPageHeader,
            showErrorListModal,
            getSmsList
        },
        dispatch
    );
};

const hoc = connect(mapStateToProps, mapDispatchToProps)(SmsList);

export { hoc as SmsList };
