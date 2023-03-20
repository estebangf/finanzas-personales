import {
  Castle,
  Inbox,
  MonetizationOn,
  Percent,
  MobileOff,
  SvgIconComponent,
  NoBackpack
} from '@mui/icons-material'

// type CategoryModel =
// interface CategoryModel {
//   value: CategorySuperior | CategoryLower
//   superior?: CategorySuperior
// }
type CategoryModel = CategorySuperior | CategoryLower

export type CategoryListModel = CategoryModel[]

export const CategoryList: Array<{
  superior: CategorySuperior
  lowers: CategoryLower[]
}> = [
  {
    superior: 'SIN CATEGORIA',
    lowers: []
  },
  {
    superior: 'Alimentos',
    lowers: [
      'Frutas y Verduras',
      'Carnes',
      'Lacteos',
      'No perecederos',
      'Postres',
      'Comida rapida',
      'Alimentos varios'
    ]
  },
  {
    superior: 'Casa',
    lowers: [
      'Alquiler',
      'Reparaciones en Casa',
      'Muebles',
      'Electrodomésticos',
      'Triturador de basura',
      'Otros Casa'
    ]
  },
  {
    superior: 'Salud',
    lowers: [
      'Gasto en médicos',
      'Medicamentos',
      'Dentista',
      'Otros Salud'
    ]
  },
  {
    superior: 'Transporte',
    lowers: [
      'Combustible',
      'Transporte Público',
      'Reparación',
      'Servicio fluidos, neumáticos',
      'Lavado de coches',
      'Otros Transporte'
    ]
  },
  {
    superior: 'Ropa y calzado',
    lowers: [
      'Ropa de adultos',
      'Ropa de niños',
      'Accesorios',
      'Calzado',
      'Otros Ropa y calzado'
    ]
  },
  {
    superior: 'Seguros',
    lowers: [
      'Seguro de vida',
      'Seguro de salud',
      'Seguro de coche',
      'Otros Seguros'
    ]
  },
  {
    superior: 'Higiene',
    lowers: [
      'Cosmética',
      'Accesorios',
      'Peluquería',
      'Salón de belleza',
      'Productos de limpieza',
      'Otros Higiene'
    ]
  },
  {
    superior: 'Diversión',
    lowers: [
      'Cine o teatro',
      'Gimnasio',
      'Piscina',
      'Cursos, etc.',
      'Pasatiempo',
      'Equipos electrónicos',
      'Revistas',
      'Libros',
      'Otros Diversión'
    ]
  },
  {
    superior: 'Deudas',
    lowers: [
      'Tarjeta de credito',
      'Mercado Credito',
      'Prestamos',
      'Cuotas',
      'Planes',
      'Contra Facturas',
      'Familia',
      'Amigos',
      'Otras deudas'
    ]
  },
  {
    superior: 'Otros gastos',
    lowers: [
      'Regalos',
      'Mascotas',
      'Vacaciones',
      'Veterinario',
      'Caridad',
      'Gastos varios'
    ]
  }
]

export type CategorySuperior =
  'Casa' |
  'Alimentos' |
  'Salud' |
  'Transporte' |
  'Ropa y calzado' |
  'Seguros' |
  'Higiene' |
  'Diversión' |
  'Deudas' |
  'Otros gastos' |
  'SIN CATEGORIA'

export type CategoryLower =
  'Alquiler' |
  'Reparaciones en Casa' |
  'Muebles' |
  'Electrodomésticos' |
  'Triturador de basura' |
  'Otros Casa' |
  'Frutas y Verduras' |
  'Carnes' |
  'Lacteos' |
  'No perecederos' |
  'Postres' |
  'Comida rapida' |
  'Alimentos varios' |
  'Gasto en médicos' |
  'Medicamentos' |
  'Dentista' |
  'Otros Salud' |
  'Combustible' |
  'Transporte Público' |
  'Reparación' |
  'Servicio fluidos, neumáticos' |
  'Lavado de coches' |
  'Otros Transporte' |
  'Ropa de adultos' |
  'Ropa de niños' |
  'Accesorios' |
  'Calzado' |
  'Otros Ropa y calzado' |
  'Seguro de vida' |
  'Seguro de salud' |
  'Seguro de coche' |
  'Otros Seguros' |
  'Cosmética' |
  'Accesorios' |
  'Peluquería' |
  'Salón de belleza' |
  'Productos de limpieza' |
  'Otros Higiene' |
  'Cine o teatro' |
  'Gimnasio' |
  'Piscina' |
  'Cursos, etc.' |
  'Pasatiempo' |
  'Equipos electrónicos' |
  'Revistas' |
  'Libros' |
  'Otros Diversión' |
  'Tarjeta de credito' |
  'Mercado Credito' |
  'Prestamos' |
  'Cuotas' |
  'Planes' |
  'Familia' |
  'Amigos' |
  'Contra Facturas' |
  'Otras deudas' |
  'Regalos' |
  'Mascotas' |
  'Vacaciones' |
  'Veterinario' |
  'Caridad' |
  'Gastos varios'

// export const CategoryListIcons: { [key in (CategorySuperior | CategoryLower)]: SvgIconComponent } = {
export const CategoryListIcons: { [key in (CategorySuperior | CategoryLower)]: string } = {
  Casa: 'icon (89)',
  Salud: 'icon (6)',
  Alimentos: 'icon (4)',
  'Frutas y Verduras': 'icon (95)',
  Carnes: 'icon (38)',
  Lacteos: 'icon (70)',
  'No perecederos': 'icon (4)',
  Postres: 'icon (82)',
  'Comida rapida': 'icon (93)',
  'Alimentos varios': 'icon (30)',
  Transporte: 'icon (16)',
  'Ropa y calzado': 'icon (34)',
  Seguros: 'icon (19)',
  Higiene: 'icon (131)',
  Diversión: 'icon (122)',
  'Otros gastos': 'icon (117)',
  Alquiler: 'icon (89)',
  'Reparaciones en Casa': 'icon (92)',
  Reparación: 'icon (92)',
  'Triturador de basura': 'icon (51)',
  'Otros Casa': 'icon (64)',
  'Gasto en médicos': 'icon (20)',
  Medicamentos: 'icon (130)',
  Dentista: 'icon (106)',
  'Otros Salud': 'icon (6)',
  Combustible: 'icon (52)',
  'Servicio fluidos, neumáticos': 'icon (105)',
  'Lavado de coches': 'icon (120)',
  'Transporte Público': 'icon (16)',
  'Otros Transporte': 'icon (128)',
  'Ropa de adultos': 'icon (59)',
  'Ropa de niños': 'icon (111)',
  Accesorios: 'icon (110)',
  Calzado: 'icon (40)',
  'Otros Ropa y calzado': 'icon (42)',
  'Seguro de vida': 'icon (19)',
  'Seguro de salud': 'icon (19)',
  'Seguro de coche': 'icon (19)',
  'Otros Seguros': 'icon (19)',
  Peluquería: 'icon (47)',
  'Salón de belleza': 'icon (39)',
  'Productos de limpieza': 'icon (44)',
  'Otros Higiene': 'icon (131)',
  Pasatiempo: 'icon (1)',
  'Equipos electrónicos': 'icon (1)',
  Libros: 'icon (98)',
  'Otros Diversión': 'icon (121)',
  Deudas: 'icon (7)',
  'Tarjeta de credito': 'icon (19)',
  'Mercado Credito': 'icon (19)',
  Prestamos: 'icon (116)',
  Cuotas: 'icon (19)',
  Planes: 'icon (19)',
  Familia: 'icon (127)',
  Amigos: 'icon (60)',
  'Contra Facturas': 'icon (25)',
  'Otras deudas': 'icon (8)',
  Regalos: 'icon (63)',
  Vacaciones: 'icon (12)',
  Veterinario: 'icon (24)',
  Caridad: 'icon (39)',
  'Gastos varios': 'icon (45)',
  Muebles: 'icon (102)',
  Electrodomésticos: 'icon (113)',
  Cosmética: 'icon (47)',
  'Cine o teatro': 'icon (122)',
  Gimnasio: 'icon (83)',
  Piscina: 'icon (61)',
  'Cursos, etc.': 'icon (48)',
  Revistas: 'icon (55)',
  Mascotas: 'icon (124)',
  'SIN CATEGORIA': 'icon (32)'
}
export default CategoryModel

// enum Arrow {
//   Up,
//   Down,
//   Left,
//   Right
// }
