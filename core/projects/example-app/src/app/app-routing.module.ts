import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BasicChunkedUploadExampleComponent} from './examples/basic-chunked-upload-example/basic-chunked-upload-example.component';
import {BasicUploadExampleComponent} from './examples/basic-upload-example/basic-upload-example.component';
import {BasicMultipartExampleComponent} from './examples/basic-multipart-example/basic-multipart-example.component';
import {AppComponent} from './app.component';

const routes: Routes = [
  {path: 'basic-upload', component: BasicUploadExampleComponent},
  {path: 'basic-chunked-upload', component: BasicChunkedUploadExampleComponent},
  {path: 'basic-multipart-upload', component: BasicMultipartExampleComponent},
  {path: '**', component: BasicUploadExampleComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
