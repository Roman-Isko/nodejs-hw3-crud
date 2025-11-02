import Joi from 'joi';

export const contactValidationSchema = Joi.object({
  name: Joi.string().required(),
  phoneNumber: Joi.string().required(),
  email: Joi.string().allow(null, '').email(), // ← головне: дозволяє null або порожній рядок
  isFavourite: Joi.boolean().default(false),
  contactType: Joi.string()
    .valid('personal', 'business', 'other')
    .default('personal'),
  createdAt: Joi.date().optional(),
  updatedAt: Joi.date().optional(),
});
