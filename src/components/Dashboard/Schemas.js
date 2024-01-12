import * as Yup from 'yup'

export const updateUserSchema = Yup.object({
  name: Yup.string().max(
    30,
    'El nombre de producto no debe tener mas de 30 caracteres'
  ),
  price: Yup.number()
    .min(0, 'El precio debe ser mayor o igual a cero')
    .positive('El precio debe ser un número positivo')
    .typeError('Debe ser un número decimal'),
  stock: Yup.number('Debe ser un numero')
    .integer('Debe ser un número entero')
    .required('La cantidad es obligatoria')
    .min(0, 'La cantidad debe ser mayor o igual a cero')
    .typeError('Debe ser un número'),
  brandId: Yup.string().uuid('Debe ser un UUID válido'),
  genderId: Yup.string().uuid('Debe ser un UUID válido'),
  materialId: Yup.string().uuid('Debe ser un UUID válido'),
  sizeId: Yup.string().uuid('Debe ser un UUID válido'),
  colorId: Yup.string().uuid('Debe ser un UUID válido'),
  categoryIds: Yup.array().min(1, 'Debe seleccionar al menos una categoria'),
})

export const createShoeSchema = Yup.object({
  name: Yup.string()
    .required()
    .min(5, 'El nombre de producto debe tener al menos 5 caracteres')
    .max(30, 'El nombre de producto no debe tener mas de 30 caracteres'),
  description: Yup.string()
    .required()
    .max(50, 'El nombre de producto no debe tener mas de 50 caracteres'),
  price: Yup.number()
    .required()
    .min(0, 'El precio debe ser mayor o igual a cero')
    .positive('El precio debe ser un número positivo')
    .typeError('Debe ser un número decimal'),
  image: Yup.string()
    .required()
    .url('Ingrese una URL válida')
    .matches(/\.(jpeg|jpg|gif|png)$/, 'Debe ser una URL de imagen válida'),
  stock: Yup.number('Debe ser un numero')
    .required()
    .integer('Debe ser un número entero')
    .required('La cantidad es obligatoria')
    .min(0, 'La cantidad debe ser mayor o igual a cero')
    .typeError('Debe ser un número'),
  discountPercentage: Yup.number()
    .min(0, 'El porcentaje debe ser mayor o igual a cero')
    .max(100, 'El porcentaje debe ser menor o igual a 100')
    .typeError('Debe ser un número decimal'),
  size: Yup.string().required().uuid('Debe ser un UUID válido'),
  color: Yup.string().required().uuid('Debe ser un UUID válido'),
  brand: Yup.string().required().uuid('Debe ser un UUID válido'),
  material: Yup.string().required().uuid('Debe ser un UUID válido'),
  gender: Yup.string().required().uuid('Debe ser un UUID válido'),
  categoryIds: Yup.array().min(1, 'Debe seleccionar al menos una categoria'),
})
