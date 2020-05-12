'use strict';

const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const uuid = require('uuid');

function getDataFolder(fileName) {
    return path.join(path.resolve(__dirname, '..'), "data", fileName + '.json');
}

module.exports = {
    all(req, res) {
        const filename = getDataFolder(req.params.d);

        if (!fs.existsSync(filename)) {
            res.status(404);
        } else {
            let rawdata = fs.readFileSync(filename);
            let data = JSON.parse(rawdata);
            res.json(data);
        }
    },

    get(req, res) {
        const filename = getDataFolder(req.params.d);

        if (!fs.existsSync(filename)) {
            res.status(404);
        } else {
            let rawdata = fs.readFileSync(filename);
            let data = JSON.parse(rawdata);

            if (typeof req.params.id === 'undefined') {
                res.status(404);
            } else {
                let item = data.filter(function (item) {
                    return item._id == req.params.id
                });

                res.json(item);
            }
        }
    },

    insert(req, res) {
        const filename = getDataFolder(req.params.d);

        if (!fs.existsSync(filename)) {
            res.status(404);
        } else {
            let rawdata = fs.readFileSync(filename);
            let data = JSON.parse(rawdata);

            let item = {
                _id: uuid.v4(),
                ...req.body
            };
            data.push(item);

            try {
                fs.writeFileSync(filename, JSON.stringify(data));

                res.json({
                    __ajs: true,
                    success: true,
                    data: item
                })
            } catch (err) {
                res.status(404);
            }
        }
    },

    update(req, res) {
        const filename = getDataFolder(req.params.d);

        if (!fs.existsSync(filename)) {
            res.status(404);
        } else {
            let rawdata = fs.readFileSync(filename);
            let data = JSON.parse(rawdata);

            const id = req.params.id;

            data.map(function (item) {
                if (item._id == id) {
                    return {
                        _id: id,
                        ..._.merge(item, req.body)
                    }
                }
            })

            try {
                fs.writeFileSync(filename, JSON.stringify(data));

                res.json({
                    __ajs: true,
                    success: true,
                    data: data.filter(function (item) {
                        return (item._id == req.params.id);
                    })
                });

            }
            catch (err) {
                res.status(404);
            }
        }
    },

    delete(req, res) {
        const filename = getDataFolder(req.params.d);

        if (!fs.existsSync(filename)) {
            res.status(404);
        } else {
            let rawdata = fs.readFileSync(filename);
            let data = JSON.parse(rawdata);

            const id = req.params.id;

            data.map(function (item, i) {
                if (item._id == id) {
                    data.splice(i, 1);
                }
            })

            fs.writeFileSync(filename, JSON.stringify(data));
            res.status(201);
        }
    }
}