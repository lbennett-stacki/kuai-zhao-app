import axios from "axios";
import type { Snap } from "@/stores/snaps";

export class SnapsService {
  async list(): Promise<Snap[]> {
    const response = await axios.get("http://localhost:3001/snaps");

    return response.data;
  }
}
