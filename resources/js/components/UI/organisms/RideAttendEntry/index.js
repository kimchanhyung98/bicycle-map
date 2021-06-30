import React, {memo} from "react";
import PropTypes from "prop-types";
import Table from "@components/UI/molecules/Table";
import TableCell from "@components/UI/atoms/TableCell";
import TableRow from "@components/UI/atoms/TableRow";

const Head = () => {
    return (
        <TableRow>
            <TableCell heading={true}>id</TableCell>
            <TableCell heading={true}>참여자</TableCell>
        </TableRow>
    );
};

const RideAttendEntry = memo(({caption, entryData}) => {
    return (
        <Table caption={caption}
               head={Head()}>
            {entryData.map(entry => {
                const {id, user} = entry;

                return (
                    <TableRow key={id}>
                        <TableCell>{id}</TableCell>
                        <TableCell>{user.name}</TableCell>
                    </TableRow>
                );
            })}
        </Table>
    );
});

RideAttendEntry.PropTypes = {
    caption: PropTypes.string,
    entryData: PropTypes.array.isRequired
};

export default RideAttendEntry;
