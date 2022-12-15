import {
  Castle,
  Inbox,
  MonetizationOn,
  Percent,
  MobileOff,
  SvgIconComponent,
  NoBackpack
} from "@mui/icons-material"

// type CategoryModel =
// interface CategoryModel {
//   value: CategorySuperior | CategoryLower
//   superior?: CategorySuperior
// }
type CategoryModel = CategorySuperior | CategoryLower

export type CategoryListModel = CategoryModel[]

export const CategoryList: {
  superior: CategorySuperior,
  lowers: CategoryLower[]
}[] = [
    {
      superior: "SIN CATEGORIA",
      lowers: []
    },
    {
      superior: "Casa",
      lowers: [
        "Alquiler",
        "Reparación",
        "Muebles",
        "Electrodomésticos",
        "Triturador de basura",
        "Otros Casa"
      ]
    },
    {
      superior: "Salud",
      lowers: [
        "Gasto en médicos",
        "Medicamentos",
        "Dentista",
        "Otros Salud"
      ]
    },
    {
      superior: "Transporte",
      lowers: [
        "Combustible",
        "Transporte",
        "Reparación",
        "Servicio fluidos, neumáticos",
        "Lavado de coches",
        "Otros Transporte"
      ]
    },
    {
      superior: "Ropa y calzado",
      lowers: [
        "Ropa de adultos",
        "Ropa de niños",
        "Accesorios",
        "Calzado",
        "Otros Ropa y calzado"
      ]
    },
    {
      superior: "Seguros",
      lowers: [
        "Seguro de vida",
        "Seguro de salud",
        "Seguro de coche",
        "Otros Seguros"
      ]
    },
    {
      superior: "Higiene",
      lowers: [
        "Cosmética",
        "Accesorios",
        "Peluquería",
        "Salón de belleza",
        "Productos de limpieza",
        "Otros Higiene"
      ]
    },
    {
      superior: "Diversión",
      lowers: [
        "Cine o teatro",
        "Gimnasio",
        "Piscina",
        "Cursos, etc.",
        "Pasatiempo",
        "Equipos electrónicos",
        "Revistas",
        "Libros",
        "Otros Diversión"
      ]
    },
    {
      superior: "Otros gastos",
      lowers: [
        "Regalos",
        "Mascotas",
        "Vacaciones",
        "Veterinario",
        "Caridad",
        "Gastos varios"
      ]
    }
  ]

export type CategorySuperior =
  "Casa" |
  "Salud" |
  "Transporte" |
  "Ropa y calzado" |
  "Seguros" |
  "Higiene" |
  "Diversión" |
  "Otros gastos" |
  "SIN CATEGORIA";

export type CategoryLower =
  "Alquiler" |
  "Reparación" |
  "Muebles" |
  "Electrodomésticos" |
  "Triturador de basura" |
  "Otros Casa" |
  "Gasto en médicos" |
  "Medicamentos" |
  "Dentista" |
  "Otros Salud" |
  "Combustible" |
  "Transporte" |
  "Reparación" |
  "Servicio fluidos, neumáticos" |
  "Lavado de coches" |
  "Otros Transporte" |
  "Ropa de adultos" |
  "Ropa de niños" |
  "Accesorios" |
  "Calzado" |
  "Otros Ropa y calzado" |
  "Seguro de vida" |
  "Seguro de salud" |
  "Seguro de coche" |
  "Otros Seguros" |
  "Cosmética" |
  "Accesorios" |
  "Peluquería" |
  "Salón de belleza" |
  "Productos de limpieza" |
  "Otros Higiene" |
  "Cine o teatro" |
  "Gimnasio" |
  "Piscina" |
  "Cursos, etc." |
  "Pasatiempo" |
  "Equipos electrónicos" |
  "Revistas" |
  "Libros" |
  "Otros Diversión" |
  "Regalos" |
  "Mascotas" |
  "Vacaciones" |
  "Veterinario" |
  "Caridad" |
  "Gastos varios"


export const CategoryListIcons: { [key in (CategorySuperior | CategoryLower)]: SvgIconComponent } = {
  Casa: Castle,
  Salud: Inbox,
  Transporte: MonetizationOn,
  "Ropa y calzado": Percent,
  Seguros: MobileOff,
  Higiene: MobileOff,
  Diversión: NoBackpack,
  "Otros gastos": Castle,
  Alquiler: Inbox,
  Reparación: MonetizationOn,
  "Triturador de basura": MobileOff,
  "Otros Casa": MobileOff,
  "Gasto en médicos": NoBackpack,
  Medicamentos: Castle,
  Dentista: Inbox,
  "Otros Salud": MonetizationOn,
  Combustible: Percent,
  "Servicio fluidos, neumáticos": MobileOff,
  "Lavado de coches": NoBackpack,
  "Otros Transporte": Castle,
  "Ropa de adultos": Inbox,
  "Ropa de niños": MonetizationOn,
  Accesorios: Percent,
  Calzado: MobileOff,
  "Otros Ropa y calzado": MobileOff,
  "Seguro de vida": NoBackpack,
  "Seguro de salud": Castle,
  "Seguro de coche": Inbox,
  "Otros Seguros": MonetizationOn,
  Peluquería: MobileOff,
  "Salón de belleza": MobileOff,
  "Productos de limpieza": NoBackpack,
  "Otros Higiene": Castle,
  Pasatiempo: MobileOff,
  "Equipos electrónicos": MobileOff,
  Libros: Castle,
  "Otros Diversión": Inbox,
  Regalos: MonetizationOn,
  Vacaciones: MobileOff,
  Veterinario: MobileOff,
  Caridad: NoBackpack,
  "Gastos varios": NoBackpack,
  "SIN CATEGORIA": Inbox,
  Muebles: MobileOff,
  Electrodomésticos: NoBackpack,
  Cosmética: Castle,
  "Cine o teatro": MobileOff,
  Gimnasio: MobileOff,
  Piscina: Castle,
  "Cursos, etc.": Inbox,
  Revistas: MonetizationOn,
  Mascotas: MobileOff
}
export default CategoryModel

function getCategory(category: CategorySuperior | CategoryLower) {

}

// enum Arrow {
//   Up,
//   Down,
//   Left,
//   Right
// }