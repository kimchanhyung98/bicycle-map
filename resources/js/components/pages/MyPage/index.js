import React, {memo} from "react";
import {Route} from "react-router-dom";
import MyPageTemplate from "@components/templates/MyPageTemplate";
import MyPageAttend from "@components/pages/MyPageAttend";
import MyPageManage from "@components/pages/MyPageManage";

const MyPage = memo(() => {
    return (
        <MyPageTemplate>
            <Route path="/mypage"
                   exact
                   component={MyPageAttend} />
            <Route path="/mypage/manage"
                   component={MyPageManage} />
        </MyPageTemplate>
    );
});

export default MyPage;
