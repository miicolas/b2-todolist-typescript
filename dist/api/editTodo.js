var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getSession } from "../utils/get-session.js";
export function handleEditTodo(_a) {
    return __awaiter(this, arguments, void 0, function* ({ id, title, description, dueDate }) {
        try {
            console.log(getSession());
            const response = yield fetch("http://localhost:3000/api/manage/todo/edit", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${getSession()}`
                },
                body: JSON.stringify({ id, title, dueDate, description })
            });
            const { data } = yield response.json();
            if (!response.ok)
                throw new Error(data.message || "Edit Todo failed");
            return data;
        }
        catch (error) {
            console.log(error instanceof Error ? error.message : "Edit Todo failed");
        }
    });
}
