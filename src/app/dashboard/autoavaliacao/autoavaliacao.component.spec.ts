import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoavaliacaoComponent } from './autoavaliacao.component';

describe('AutoavaliacaoComponent', () => {
  let component: AutoavaliacaoComponent;
  let fixture: ComponentFixture<AutoavaliacaoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AutoavaliacaoComponent]
    });
    fixture = TestBed.createComponent(AutoavaliacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
