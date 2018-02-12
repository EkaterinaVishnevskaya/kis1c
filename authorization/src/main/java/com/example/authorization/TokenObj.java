package com.example.authorization;

import org.bson.types.ObjectId;

public class TokenObj {
    private ObjectId userId;
    private String token;
    private String loginTime;

    public TokenObj(ObjectId userId, String token, String loginTime) {
        this.userId = userId;
        this.token = token;
        this.loginTime = loginTime;
    }

    public ObjectId getUserId() {
        return userId;
    }

    public void setUserId(ObjectId userId) {
        this.userId = userId;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getLoginTime() {
        return loginTime;
    }

    public void setLoginTime(String loginTime) {
        this.loginTime = loginTime;
    }
}
