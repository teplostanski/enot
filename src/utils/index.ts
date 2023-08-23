import { IToggleObjectValue } from '../types'

/**
 * Функция с замыканием
 * @param object Замыкаемый объект, значениям которого будут присвоены false
 * @param value Строка с именем ключа, которому будет присвоено значение true
 * @desc Мутирует замыкаемый объект напрямую, не возвращая новый объект
 */
export const toggleObjectValue = (object: IToggleObjectValue) => {
  return (value: string) => {
    Object.keys(object).forEach((key) => {
      object[key] = false
      if (key === value) {
        object[key] = true
      }
    })

    return object
  }
}
