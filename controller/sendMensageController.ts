import { SendProps } from "../@types/SendProps";
import { Request, Response } from "express";
import request from "request";

export const sendMensage = (
	req: Request<{}, {}, SendProps>,
	res: Response
) => {
	const { msg, number } = req.body;

	try {
		var options = {
			method: "POST",
			url: `https://${process.env.HOST_API_MEGA}/rest/sendMessage/${process.env.INSTANCE_KEY_MEGA}/text`,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${process.env.TOKEN_API_MEGA}`,
			},
			body: JSON.stringify({
				messageData: {
					to: `55${number}@s.whatsapp.net`,
					text: msg,
				},
			}),
		};
		request(options, function (error: any, response: any) {
			if (error) throw new Error(error);
			console.log(response.body);
		});

		res.status(200).json({ msg: "send sucess" });
	} catch (error) {
		res.status(500).json({ msg: "erro send sucess" });
	}
};
