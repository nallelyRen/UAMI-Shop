import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarDatosProductoComponent } from './modificar-datos-producto.component';

describe('ModificarDatosProductoComponent', () => {
  let component: ModificarDatosProductoComponent;
  let fixture: ComponentFixture<ModificarDatosProductoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificarDatosProductoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarDatosProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
