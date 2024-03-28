const router = require('./login')
const request = require('supertest');
const express = require('express');

describe("Login Route", () => {
    test("should return successful login", async () => {
        const response = request(router).post("/").send({
            username: "rodney",
            password: "12345"
        })
        expect(response.statusCode).toBe(404);
    })
}) 