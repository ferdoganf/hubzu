import React from "react";
import RealestateDetailsListItem from './RealestateDetailsListItem';
import { I18n } from 'react-redux-i18n';
import { Table } from 'semantic-ui-react'

export default class RealestateDetailsListTable extends React.Component {
    render() {
        return (
            <Table celled striped size='small' compact='very'>
                <Table.Body>
                    {this.props.realestateProperties && this.props.realestateProperties.map((property, i) =>
                        <RealestateDetailsListItem key={property.title} detailsProperty={property.value} detailsPropertyTitle={I18n.t("label." + property.title)}></RealestateDetailsListItem>
                    )
                    }
                </Table.Body>
            </Table>
        );
    }
}