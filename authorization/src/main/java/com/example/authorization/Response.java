package com.example.authorization;

public class Response {
    private boolean ok;
    private String token;

    public Response(boolean ok, String token) {
        this.ok = ok;
        this.token = token;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public boolean isOk() {
        return ok;
    }

    public void setOk(boolean ok) {
        this.ok = ok;
    }
}
