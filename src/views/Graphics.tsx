import { Add, ListAltRounded } from '@mui/icons-material'
import { Box, Fab, List, Zoom } from '@mui/material'
import { useEffect, useState } from 'react'
import { Link, Navigate, Outlet } from 'react-router-dom'
import CategoryModel, { CategoryList, CategoryListModel } from '../models/CategoryModel'
import { getComparator } from '../tools/getComparator'
import useAuth from '../tools/useAuth'
import useWallets from '../tools/useWallets'
import AddButton from '../components/AddButton'
import useMovements from '../tools/useMovements'
import GraphicBarItem from '../components/GraphicBarItem'
import { UrlWithStringQuery } from 'url'

interface CategoryGraphicValue {
  category: CategoryModel
  val: number
}
interface LimitsOnGraphic { min: number, max: number }

const Graphics: React.FC<{}> = () => {
  // useAuth().setTitle("Lista de movimientos");
  useAuth().setTitle(useWallets().walletSelected?.name ?? 'Cargando cuenta')
  const { movements } = useMovements()
  const { walletSelected } = useWallets()

  const [categories, setCategories] = useState<CategoryGraphicValue[]>([])
  const [hidenCategories, setHidenCategories] = useState<CategoryModel[]>(['SIN CATEGORIA'])
  const [limits, setLimits] = useState<LimitsOnGraphic>({
    min: 0,
    max: 0
  })

  useEffect(() => {
    const _categories: CategoryGraphicValue[] = []
    const _movements = movements.filter(movement => movement.amount < 0 && !hidenCategories.includes(movement.category))
    let _limits: LimitsOnGraphic = {
      min: 0,
      max: 0
    }
    CategoryList.forEach(category => {
      const _movementsSuperior = _movements.filter(movement => movement.category === category.superior)
      if (_movementsSuperior.length) {
        _categories.push({
          category: category.superior,
          val: Math.abs(_movementsSuperior.reduce((a, b) => a + b.amount, 0))
        })
        _limits = {
          // min: _limits.min > _categories[_categories.length - 1].val ? _categories[_categories.length - 1].val : _limits.min,
          min: 0,
          max: _limits.max < _categories[_categories.length - 1].val ? _categories[_categories.length - 1].val : _limits.max
        }
      }

      category.lowers.forEach(category => {
        const _movementsLowers = _movements.filter(movement => movement.category === category)
        if (_movementsLowers.length) {
          _categories.push({
            category: category,
            val: Math.abs(_movementsLowers.reduce((a, b) => a + b.amount, 0))
          })
          _limits = {
            // min: _limits.min > _categories[_categories.length - 1].val ? _categories[_categories.length - 1].val : _limits.min,
            min: 0,
            max: _limits.max < _categories[_categories.length - 1].val ? _categories[_categories.length - 1].val : _limits.max
          }
        }
      })
    })
    setCategories(_categories)
    setLimits(_limits)
  }, [movements, hidenCategories])

  function calcPercentage (total: number): number {
    const diff = limits.max - limits.min
    return (total - limits.min) * 100 / diff
  }

  function randColor (): string {
    return `rgba(${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)}, 0.5)`
  }

  function handleHidel (category: CategoryModel): void {
    setHidenCategories(p => [...p, category])
  }

  return (
    <Box sx={{
      // bgcolor: "#ffffffa1"
      pb: 8
    }}>
      <List>
        {categories.map(category => (
          <GraphicBarItem handleHidel={() => handleHidel(category.category)} key={category.category} {...category} color={randColor()} percentage={calcPercentage(category.val)} />
        ))}
      </List>
    </Box>
  )
}

export default Graphics
