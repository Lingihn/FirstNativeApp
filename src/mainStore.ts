import axios from "axios";
import { action, makeObservable, observable, runInAction } from "mobx";
import { API_URL, API_ACCESS_KEY } from "./App";
import React from "react";

type AppData = { id: string, alt: string, url: string }
type ToastMessageType = 'success' | 'warning' | 'error' | 'info'
type ToastMessage = { message: string, toastType: ToastMessageType }


export class MainStore {
  constructor() {
    makeObservable(this, {
      mainData: observable,
      prepareData: action,
      fetchData: action,
      refreshData: action,

      toastMessage: observable,
      toastVisible: observable,

      setToastMessage: action,
      setToastVisible: action
    })
  }
  toastMessage: ToastMessage = { message: '', toastType: 'info' }
  toastVisible = false
  setToastVisible = (visible: boolean) => { this.toastVisible = visible }
  setToastMessage = (message: string, toastType: ToastMessageType) => {
    this.toastMessage = { message, toastType }
    this.setToastVisible(true)
  }

  mainData: AppData[] = []

  prepareData(fetched_data: any[]) {
    return fetched_data.map((item) => {
      return {
        id: item.id,
        alt: item.description,
        url: item.urls.small
      } as AppData
    })
  }

  fetchData = async () => {
    try {
      await axios.get(`${API_URL}/photos/random`, {
        params: {
          client_id: API_ACCESS_KEY,
          count: 10
        }
      }).then(response => runInAction(() => {
          this.mainData = [...this.mainData, ...this.prepareData(response.data as any[])]
        }))
    } catch (e) {
      if (e instanceof Error) {
        if(e.message.includes('403')) this.setToastMessage('Ошибка при обращении к Unsplash. \nПроверьте валидность ключа', 'error')
        if(e.message.includes('401')) this.setToastMessage('Ошибка при обращении к Unsplash. \nПроверьте валидность ключа', 'error')
      }
    }
  }

  refreshData = () => {
    this.mainData = []
    this.fetchData()
  }
}
const mainStore = new MainStore()
export const mainStoreContext = React.createContext(mainStore)
export const useMainStore = () => React.useContext(mainStoreContext)