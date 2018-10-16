import React from "react";
import { Table } from "react-bootstrap";
import { getAge } from "../../../utils";

const BasicTable = props => {
  const { headers, items } = props;
  return (
    <Table striped bordered condensed hover responsive>
      <thead>
        <tr>
          {headers.map(title => (
            <th key={title}> {title === "dateOfBirth" ? "age" : title}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {items.map(item => {
          return (
            <tr key={item.name}>
              {headers.map(itemProp => {
                return (
                  <td key={item.name + itemProp}>
                    {itemProp === "dateOfBirth"
                      ? getAge(new Date(item[itemProp]))
                      : item[itemProp].toString()}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default BasicTable;
