import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuloEliminarComponent } from './modulo-eliminar.component';

describe('ModuloEliminarComponent', () => {
  let component: ModuloEliminarComponent;
  let fixture: ComponentFixture<ModuloEliminarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModuloEliminarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuloEliminarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
