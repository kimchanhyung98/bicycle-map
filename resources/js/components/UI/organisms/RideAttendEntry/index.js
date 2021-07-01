import React, {memo} from "react";
import PropTypes from "prop-types";
import Table from "@components/UI/molecules/Table";
import TableCell from "@components/UI/atoms/TableCell";
import TableRow from "@components/UI/atoms/TableRow";
import {convertDate} from "@/utils/dateFormat";

const Head = () => {
    return (
        <TableRow>
            <TableCell heading={true}></TableCell>
            <TableCell heading={true}>참여자</TableCell>
            <TableCell heading={true}>신청시간</TableCell>
        </TableRow>
    );
};

const RideAttendEntry = memo(({caption, entryData}) => {
    return (
        <Table caption={caption}
               head={Head()}>
            {entryData.map((entry, index) => {
                const {id, user, created_at} = entry;

                return (
                    <TableRow key={id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{convertDate(created_at)}</TableCell>
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
