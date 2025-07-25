import successResponse from "../../utils/responses/successResponse.js";
import models from "../../models/index.js";
import { authorizeUser } from "../../middlewares/auth.middleware.js";
import { NotFoundException } from "../../exceptions/index.js";

const { finance_records } = models;

const getFinanceRecords = async (req, res, next) => {
  try {
    await authorizeUser(req, "view_finance_record");
    const financeRecords = await finance_records.find().sort({ date: "desc" });

    return successResponse(
      res,
      financeRecords,
      "Finance records fetched successfully!",
      "finance_records",
    );
  } catch (error) {
    next(error);
  }
};

const createFinanceRecord = async (req, res, next) => {
  try {
    await authorizeUser(req, "create_finance_record");
    const financeRecord = await finance_records.create(req.body);
    return successResponse(
      res,
      financeRecord,
      "Finance record created successfully!",
      "finance_records",
    );
  } catch (error) {
    next(error);
  }
};

const getFinanceRecordById = async (req, res, next) => {
  try {
    await authorizeUser(req, "view_finance_record");
    const financeRecord = await finance_records.findById(req.params.id);

    if (!financeRecord)
      throw new NotFoundException("Finance record not found!");
    return successResponse(
      res,
      financeRecord,
      "Finance record fetched successfully!",
      "finance_records",
    );
  } catch (error) {
    next(error);
  }
};

const updateFinanceRecord = async (req, res, next) => {
  try {
    await authorizeUser(req, "edit_finance_record");
    let financeRecord = await finance_records.findById(req.params.id);
    if (!financeRecord) throw new NotFoundException("Finance record not found");
    financeRecord = await finance_records.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      },
    );
    return successResponse(
      res,
      financeRecord,
      "Finance record updated successfully!",
      "finance_records",
    );
  } catch (error) {
    next(error);
  }
};

const deleteFinanceRecord = async (req, res, next) => {
  try {
    await authorizeUser(req, "delete_finance_record");
    const financeRecord = await finance_records.findById(req.params.id);
    if (!financeRecord) throw new NotFoundException("Finance record not found");
    await finance_records.findByIdAndDelete(req.params.id);
    return successResponse(
      res,
      {},
      "Finance record deleted successfully!",
      "finance_records",
    );
  } catch (error) {
    next(error);
  }
};

export default {
  getFinanceRecords,
  createFinanceRecord,
  getFinanceRecordById,
  updateFinanceRecord,
  deleteFinanceRecord,
};
