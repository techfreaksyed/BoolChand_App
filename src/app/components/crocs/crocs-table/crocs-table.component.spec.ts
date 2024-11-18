import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrocsTableComponent } from './crocs-table.component';

describe('CrocsTableComponent', () => {
  let component: CrocsTableComponent;
  let fixture: ComponentFixture<CrocsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrocsTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrocsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
