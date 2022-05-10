import http from "../http-common";
import TokenService from "./token.service";
class ItemDataService {
    getAllItems() {
        return http.get(`/items/`);
    }
    getAll(catName) {
        return http.get(`/items/${catName}`);
    }
    get(id) {
        return http.get(`/items/detail/${id}`);
    }
    getFeatured() {
        return http.get(`/items/featured/`);
    }
    create(data) {
        return http.post("/items", data);
    }
    update(id, data) {
        return http.put(`/items/${id}`, data);
    }
    delete(id) {
        return http.delete(`/items/${id}`);
    }
    deleteAll() {
        return http.delete("/items");
    }
}

export default new ItemDataService();