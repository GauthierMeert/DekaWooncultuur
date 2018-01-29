import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryFeComponent } from './category-fe.component';

describe('CategoryFeComponent', () => {
  let component: CategoryFeComponent;
  let fixture: ComponentFixture<CategoryFeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryFeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryFeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
