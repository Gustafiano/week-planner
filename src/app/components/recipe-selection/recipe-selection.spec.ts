import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeSelection } from './recipe-selection';

describe('RecipeSelection', () => {
  let component: RecipeSelection;
  let fixture: ComponentFixture<RecipeSelection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeSelection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipeSelection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
