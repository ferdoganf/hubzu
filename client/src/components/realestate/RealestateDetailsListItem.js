import React, { Component } from 'react';
import { Table, Header } from 'semantic-ui-react'
import { I18n } from 'react-redux-i18n';

class RealestateDetailsListItem extends Component {
    render() {
        return (

            this.props.detailsProperty && ((!Array.isArray(this.props.detailsProperty)) || (this.props.detailsProperty.length > 0)) ?
                <Table.Row>
                    <Table.Cell>
                        <Header size='tiny'>{this.props.detailsPropertyTitle}</Header>
                    </Table.Cell>
                    <Table.Cell>
                        {
                            Array.isArray(this.props.detailsProperty) ?
                                this.props.detailsProperty.map(item => I18n.t("label." + item.code)).join(", ") :
                                this.props.detailsProperty.code ? I18n.t("label." + this.props.detailsProperty.code) : this.props.detailsProperty
                        }
                    </Table.Cell>
                </Table.Row>
                : null

        );
    }
}
export default RealestateDetailsListItem;