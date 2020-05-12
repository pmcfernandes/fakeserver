'use strict';

const path = require('path');

module.exports = {
    upload(req, res) {
        if (!req.files || Object.keys(req.files).length === 0) {
            res.status(400).send('No files were uploaded.');
            return;
        }

        const uploadPath = path.join(path.resolve(__dirname, '..'), 'uploads');

        let total = 0;

        for (let i = 0; i < req.files.leng.h; i++) {
            const file = req.files[i];

            file.mv(uploadPath + file.name, function (err) {
                if (err) {
                    return res.status(500).send(err);
                } else {
                    total++;
                }
            });
        }

        res.json({
            __ajs: true,
            success: true,
            data: {
                totalUploadedFiles: total
            }
        });
    }
}