import axios from "axios";
import { action, computed, makeObservable, observable, runInAction } from "mobx";
import { API_URL, API_ACCESS_KEY } from "../../App";
import React from "react";
import { MainStore } from "../../mainStore";
type CardData = { id: string, alt: string, url: string, camera_model: string, camera_exposure_time: string, camera_aperture: string, camera_focal_length: string, camera_iso: string }


export class CardStore extends MainStore {
  constructor() {
    super()
    makeObservable(this, {
      data: observable,
      fetchDataById: action,
      exifDataisEmpty: computed
    })
  }
  emptyCard = { id: '', alt: '', url: '../../assets/imagePlaceholder.jpg', camera_model: '', camera_aperture: '', camera_exposure_time: '', camera_focal_length: '', camera_iso: '' }

  data: CardData = this.emptyCard

  fetchDataById = async (id: string) => {
    try {
      await axios.get(`${API_URL}/photos/${id}`, {
        params: {
          client_id: API_ACCESS_KEY
        }
      })
        .then(response => runInAction(() => {
          this.data = this.prepareCardData(response.data as any)
        }))
    } catch (e) {
        if (e instanceof Error) {
          if(e.message.includes('403')) this.setToastMessage('Ошибка при обращении к Unsplash. \nПроверьте валидность ключа', 'error')
          if(e.message.includes('401')) this.setToastMessage('Ошибка при обращении к Unsplash. \nПроверьте валидность ключа', 'error')
        }      
    }
  }

  prepareCardData = (data: any) => {
    return {
      id: data.id,
      alt: data.description,
      url: data.urls.small,
      camera_model: data.exif.make && data.exif.model ? `${data.exif.make} ${data.exif.model}` : null,
      camera_exposure_time: data.exif.exposure_time,
      camera_aperture: data.exif.aperture,
      camera_focal_length: data.exif.focal_length,
      camera_iso: data.exif.iso
    } as CardData
  }

  get exifDataisEmpty() { return this.data.camera_model || this.data.camera_iso || this.data.camera_aperture || this.data.camera_exposure_time || this.data.camera_focal_length }

}
const cardStore = new CardStore()
export const cardStoreContext = React.createContext(cardStore)
export const useCardStore = () => React.useContext(cardStoreContext)