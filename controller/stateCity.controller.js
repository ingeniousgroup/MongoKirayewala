
import { StateCity } from "../model/stateCity.model.js"
export const stateCity = async (request, response, next) => {
    try {
        let respon = await StateCity.create({ stateAndCity: request.body.states });
        return response.status(200).json({ message: "save", status: true });

    } catch (err) {
        return response.status(500).json({ message: "Internal server error", status: false });
    }
}