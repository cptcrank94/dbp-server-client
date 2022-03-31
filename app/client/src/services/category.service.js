import http from "../http-common";
class CategoryDataService {
    getAll() {
        return http.get("/categorys");
    }
    get(id) {
        return http.get(`/categorys/${id}`);
    }
    create(data) {
        return http.post("/categorys", data);
    }
    update(id, data) {
        return http.put(`/categorys/${id}`, data);
    }
    delete(id) {
        return http.delete(`/categorys/${id}`);
    }
    deleteAll() {
        return http.delete("/categorys");
    }
}

export default new CategoryDataService();