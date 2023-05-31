import { Admin } from "../model/admin.modal.js";
import { User } from "../model/user.model.js";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
import { HouseRequest } from "../model/houseRequest.modal.js";
import { OwnerRequest } from "../model/ownerRequest.modal.js";
import { Subscription } from "../model/subscription.js";

export const signIn = async (request, response, next) => {
    try {
        let user = await Admin.findOne({ email: request.body.email });
        let status = user ? await bcrypt.compare(request.body.password, user.password) : false;
        return status ? response.status(200).json({ message: 'Signin Success', status: true, user: { ...user.toObject(), password: undefined } }) :
            response.status(401).json({ message: 'Unauthorized user', status: false });
    }
    catch (err) {
        console.log(err);
        return response.status(500).json({ error: "Internal Server Error", status: false });
    }
}
export const signUp = async (request, response, next) => {
    try {
        const errors = validationResult(request);
        console.log(errors);
        if (!errors.isEmpty())
            return response.status(400).json({ error: "Bad request", status: false, errors: errors.array() });
        const saltKey = await bcrypt.genSalt(10);
        request.body.password = await bcrypt.hash(request.body.password, saltKey);
        let user = await Admin.create({ name: request.body.name, email: request.body.email, password: request.body.password, contact: request.body.contact, balance: 0 });
        return response.status(200).json({ message: "Signup success", user: user, status: true });
    }
    catch (err) {
        console.log(err)
        return response.status(500).json({ error: "Internal Server Error", status: false });
    }
}

export const viewBalance = async (request, response, next) => {
    try {
        let admin = await Admin.find({ email: request.body.email });
        return admin ? response.status(200).json({ balance: admin[0].balance, status: true }) : response.status(500).json({ message: "wrong email password", status: false });
    } catch (err) {
        return response.status(500).json({ message: "internal server error", status: false });
    }
}

export const viewTenants = async (request, response, next) => {
    try {
        let tenantList = await User.find({ role: request.body.role });
        return response.status(200).json({ tenantList, status: true });
    } catch (err) {
        return response.status(500).json({ message: "internal server error", status: false });
    }
}

export const viewOwners = async (request, response, next) => {
    try {
        let ownerList = await User.find({ role: request.body.role });
        return response.status(200).json({ ownerList, status: true });
    } catch (err) {
        return response.status(500).json({ message: "internal server error", status: false });
    }
}

export const changePassword = async (request, response, next) => {

    try {
        let admin = await Admin.findOne({ _id: request.body.id });
        if (admin) {
            if (await bcrypt.compare(request.body.currentPassword, admin.password)) {
                var saltKey = await bcrypt.genSalt(10);
                let password = await bcrypt.hash(request.body.newPassword, saltKey);
                let admin = await Admin.updateOne({ _id: request.body.id }, { password });
                return response.status(200).json({ message: "update password succesfuly", status: true })
            }
            return response.status(401).json({ message: "wrong currentPassword", status: false })
        }
        return response.status(404).json({ message: "this admin is not found", status: false })

    } catch (error) {
        return response.status(500).json({ message: "internal server error", status: false });
    }
}

export const viewHouseRequest = async (request, response, next) => {
    try {
        let requestList = await HouseRequest.find().populate({ path: "userId" }).populate({ path: 'propertyId' });
        return response.status(200).json({ requestList, status: true });
    } catch (error) {
        return response.status(500).json({ message: "Internal server error", status: false });
    }

}


export const removeOwner = async (request, response, next) => {
    try {
        let result = await User.findOneAndRemove({ _id: request.body.id });
        return response.status(200).json({ message: "ownerRemove", status: true });

    } catch (error) {
        return response.status(500).json({ message: "Internal server error", status: false });

    }
}


export const removeTenant = async (request, response, next) => {
    try {
        let result = await User.findOneAndRemove({ _id: request.body.id, role: request.body.role });
        return response.status(200).json({ message: "tenantRemove", status: true });

    } catch (error) {
        return response.status(500).json({ message: "Internal server error", status: false });

    }
}

export const ownerRequest = async (request, response, next) => {
    try {
        let result = await OwnerRequest.create(request.body);
        return response.status(200).json({ message: "request send successfully", status: true });
    }
    catch (err) {
        return response.status(500).json({ message: "Internal server error", status: false });

    }
}

export const requestRemove = async (request, response, next) => {
    try {
        let result = await HouseRequest.findByIdAndDelete({ _id: request.body.id });
        let requestList = await HouseRequest.find().populate({ path: "userId" }).populate({ path: 'propertyId' });
        return response.status(200).json({ requestList, status: true });

    }
    catch (err) {
        console.log(err);
        return response.status(500).json({ message: "Internal server error", status: false });
    }

}
export const viewSubscription = async (request, response) => {
    try {
        let result = await Subscription.find().populate({ path: "userId" });

        return response.status(200).json({ result: result, status: true });

    } catch (error) {
        return response.status(500).json({ message: "Internal server error", status: false });

    }
}

export const count = async (request, response) => {
    try {
        let countSubscripton = await Subscription.countDocuments();
        let countOwner = await User.countDocuments({ role: 'Owner' });
        let countTenant = await User.countDocuments({ role: 'Tenant' });
        return response.status(200).json({ subscription: countSubscripton, tenant: countTenant, owner: countOwner, status: true });
    } catch (error) {
        return response.status(500).json({ message: "Internal server error", status: false });
    }
}

export const searching = async (request, response, next) => {
    try {
        let searchdata = await User.find({ $or: [{ name: { $regex: request.body.data } }, { email: { $regex: request.body.data } }, { role: request.body.data }] });
        return response.status(200).json({ searchdata, status: true });
    } catch (error) {
        console.log(error);
        return response.status(500).json({ message: "Internal server error", status: false });
    }
}

