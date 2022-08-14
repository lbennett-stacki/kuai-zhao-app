import { SnapsService } from "@/services/snaps.service";
import { defineStore } from "pinia";
import { ref } from "vue";

export enum TranslationEngine {
  GCLOUD = "gcloud",
}

export interface Translation {
  id: number;
  result: string;
  engine: TranslationEngine;
  createdAt: Date;
  updatedAt: Date;
}

export enum RecognitionEngine {
  TESSERACT = "tesseract",
  GCLOUD = "gcloud",
}

export interface Recognition {
  id: number;
  translations: Translation[];
  result: string;
  engine: RecognitionEngine;
  createdAt: Date;
  updatedAt: Date;
}

export interface Snap {
  id: number;
  name: string;
  recognitions: Recognition[];
  createdAt: Date;
  updatedAt: Date;
}

export const useSnapsStore = (...args: any[]) => {
  const service = new SnapsService();

  return defineStore("snaps", () => {
    const snaps = ref([] as Snap[]);

    function findSnap(id: number) {
      return snaps.value.find((snap) => snap.id === id);
    }

    async function fetchSnaps() {
      let latest = await service.list();
      snaps.value = latest;
    }

    async function addSnap(snap: Snap) {
      snaps.value.push(snap);
    }

    return { snaps: snaps, findSnap, fetchSnaps, addSnap };
  })(...args);
};
