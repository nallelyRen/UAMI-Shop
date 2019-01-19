import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarImagenProductoComponent } from './modificar-imagen-producto.component';

describe('ModificarImagenProductoComponent', () => {
  let component: ModificarImagenProductoComponent;
  let fixture: ComponentFixture<ModificarImagenProductoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificarImagenProductoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarImagenProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
