import React, {memo} from "react";
import {Route} from "react-router-dom";
import MyPageTemplate from "@components/templates/MyPageTemplate";
import MyPageAttend from "@components/pages/MyPageAttend";
import MyPageManage from "@components/pages/MyPageManage";
import MyPageAttendEntry from "@components/pages/MyPageAttendEntry";

const MyPage = memo(() => {
    return (
        <MyPageTemplate>
            <Route path="/mypage"
                   exact
                   component={MyPageAttend} />
            <Route path="/mypage/manage"
                   exact
                   component={MyPageManage} />
            <Route path="/mypage/:id/entry"
                   exact
                   component={MyPageAttendEntry} />
        </MyPageTemplate>
    );
});

export default MyPage;
