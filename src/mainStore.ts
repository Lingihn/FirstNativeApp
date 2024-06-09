import axios from "axios";
import { action, makeObservable, observable, runInAction } from "mobx";
import { API_URL, API_ACCESS_KEY } from "./App";
import React from "react";

type appData = { id: string, alt: string, url: string}
type toastMessageType = 'success' | 'warning' | 'error' | 'info'
type toastMessage = { message: string, toastType: toastMessageType }


export class MainStore {
  constructor() {
    makeObservable(this, {
      mainData: observable,
      prepareData: action,
      fetchData: action,
      refreshData: action,
      toastMessage: observable,
      setToastMessage: action,
      toastVisible: observable,
      setToastVisible: action
    })
  }
  toastMessage: toastMessage = { message: '', toastType: 'info' }
  toastVisible = false
  setToastVisible = (visible: boolean) => { this.toastVisible = visible }
  setToastMessage = (message: string, toastType: toastMessageType) => {
    this.toastMessage = { message, toastType }
    this.setToastVisible(true)
  }

  mainData: appData[] = []
  prepareData(fetched_data: any[]) {
    return fetched_data.map((item) => {
      return {
        id: item.id,
        alt: item.description,
        url: item.urls.small
      } as appData
    })
  }
  fetchData = async () => {
    try {
      await axios.get(`${API_URL}/photos/random`, {
        params: {
          client_id: API_ACCESS_KEY,
          count: 10
        }
      })
        .then(response => runInAction(() => {
          this.mainData = [...this.mainData, ...this.prepareData(response.data as any[])]
        }))
    } catch (e) {
      if (e instanceof Error) {
        console.log('error');
        this.setToastMessage('Ошибка получения данных из Unsplash', 'error')
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