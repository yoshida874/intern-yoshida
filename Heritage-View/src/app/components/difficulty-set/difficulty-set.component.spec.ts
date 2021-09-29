import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DifficultySetComponent } from './difficulty-set.component';

describe('DifficultySetComponent', () => {
  let component: DifficultySetComponent;
  let fixture: ComponentFixture<DifficultySetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DifficultySetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DifficultySetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
