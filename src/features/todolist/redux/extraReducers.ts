import { errorLoadingTodos } from './errorLoadingTodos';
import { loadTodos } from './loadTodos';
import { loadedTodos } from './loadedTodos';
import { loadingTodos } from './loadingTodos';

export default function extraReducers(builder: any) {
  builder.addCase(loadTodos.pending, loadingTodos);
  builder.addCase(loadTodos.fulfilled, loadedTodos);
  builder.addCase(loadTodos.rejected, errorLoadingTodos);
}
