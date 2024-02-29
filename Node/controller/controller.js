// // controller.js

const service = require('../service/service');
const constants = require('../constant/constant');
const { STATUS_CODES, MESSAGES } = constants;

exports.getAllAlarms = async(req, res) => {
    try {
        const alarms = await service.getAllAlarms();
        res.status(STATUS_CODES.SUCCESS).json(alarms);
    } catch (error) {
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};

exports.getAlarmById = async(req, res) => {
    const { id } = req.params;
    try {
        const alarm = await service.getAlarmById(id);
        if (!alarm) {
            res.status(STATUS_CODES.NOT_FOUND).json({ message: MESSAGES.NOT_FOUND });
            return;
        }
        res.status(STATUS_CODES.SUCCESS).json(alarm);
    } catch (error) {
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};

exports.createAlarm = async(req, res) => {
    const alarmData = req.body;
    try {
        const alarm = await service.createAlarm(alarmData);
        res.status(STATUS_CODES.CREATED).json(alarm);
    } catch (error) {
        res.status(STATUS_CODES.BAD_REQUEST).json({ message: error.message });
    }
};

exports.updateAlarm = async(req, res) => {
    const { id } = req.params;
    const alarmData = req.body;
    try {
        const updatedAlarm = await service.updateAlarm(id, alarmData);
        res.status(STATUS_CODES.SUCCESS).json(updatedAlarm);
    } catch (error) {
        res.status(STATUS_CODES.BAD_REQUEST).json({ message: error.message });
    }
};

exports.deleteAlarm = async(req, res) => {
    const { id } = req.params;
    try {
        await service.deleteAlarm(id);
        res.status(STATUS_CODES.SUCCESS).json({ message: MESSAGES.ALARM_DELETED });
    } catch (error) {
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};