var Joi = require('joi');

module.exports = {
	contact: Joi.object({
		id: Joi.number().optional(),
        first_name: Joi.string().min(2).max(30).required(),
        middle_initial: Joi.string().alphanum().max(1),
        last_name: Joi.string().min(2).max(30).required(),
        title: Joi.string().max(30),
        phone_number: Joi.string().max(30),
        email: Joi.string().email(),
        street_address: Joi.string().max(100),
        city: Joi.string().max(100),
        state: Joi.string().alphanum().max(30),
        zip_code: Joi.string().max(30),
        created_at: Joi.date(),
        updated_at: Joi.date()
	})
}