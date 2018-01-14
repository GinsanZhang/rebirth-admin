import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestBedUtils } from '../../../test-utils/test-bed-utils';
import { OrderMockComponent } from './order-mock.component';

describe('OrderMockComponent', () => {
  let component: OrderMockComponent;
  let fixture: ComponentFixture<OrderMockComponent>;

  TestBedUtils.configureTestingModule({
    declarations: [OrderMockComponent],
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderMockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
