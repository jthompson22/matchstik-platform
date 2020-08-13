import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { SectionTilesProps } from '../../utils/SectionProps';
import SectionHeader from './partials/SectionHeader';
import Switch from '../elements/Switch';
import Button from '../elements/Button';
import Image from '../elements/Image';

const propTypes = {
  ...SectionTilesProps.types,
  pricingSwitcher: PropTypes.bool
}

const defaultProps = {
  ...SectionTilesProps.defaults,
  pricingSwitcher: false
}

class Pricing extends React.Component {

  state = {
    pricingSwitchOn: true
  }

  handlePricingSwitch = (e) => {
    this.setState({ pricingSwitchOn: e.target.checked });
  }

  render() {

    const {
      className,
      topOuterDivider,
      bottomOuterDivider,      
      topDivider,
      bottomDivider,
      hasBgColor,
      invertColor,
      pushLeft,
      pricingSwitcher,
      ...props
    } = this.props;

    const outerClasses = classNames(
      'pricing section',
      topOuterDivider && 'has-top-divider',
      bottomOuterDivider && 'has-bottom-divider',
      hasBgColor && 'has-bg-color',
      invertColor && 'invert-color',
      className
    );

    const innerClasses = classNames(
      'pricing-inner section-inner',
      topDivider && 'has-top-divider',
      bottomDivider && 'has-bottom-divider'
    );

    const tilesClasses = classNames(
      'tiles-wrap illustration-section-07',
      pushLeft && 'push-left'
    );

    const sectionHeader = {
      title: 'Simple pricing',
      paragraph: ''
    };

    return (
      <section
        {...props}
        className={outerClasses}
      >
        <div className="container">
          <div className={innerClasses}>
            <SectionHeader data={sectionHeader} className="center-content invert-color" />
            {pricingSwitcher &&
              <div className="pricing-switcher center-content">
                <Switch
                  checked={this.state.pricingSwitchOn}
                  onChange={this.handlePricingSwitch}
                  rightLabel="Billed Annually">
                    Billed Monthly
                </Switch>
              </div>
            }
            <div className={tilesClasses}>

              <div className="tiles-item reveal-scale-up">
                <div className="tiles-item-inner has-shadow">
                  <div className="pricing-item-content">
                    <div className="pricing-item-header pb-16 mb-24">
                      <div className="pricing-item-price mb-4">
                        <span className="pricing-item-price-currency h2 text-color-low">$</span>
                        <span className="pricing-item-price-amount h1">{this.state.pricingSwitchOn ? '47' : '55'}</span>
                      </div>
                      <div className="text-color-low text-xs">
                        /month, billed {this.state.pricingSwitchOn ? 'annually': 'monthly' }
                      </div>
                    </div>
                    <div className="pricing-item-features mb-40">
                      <div className="pricing-item-features-title fw-500 text-xs text-color-high mb-24">
                        What's included
                      </div>
                      <ul className="pricing-item-features-list list-reset text-xs mb-32">
                        <li className="is-checked">Excepteur sint occaecat velit</li>
                        <li className="is-checked">Excepteur sint occaecat velit</li>
                        <li className="is-checked">Excepteur sint occaecat velit</li>
                        <li>Excepteur sint occaecat velit</li>
                        <li>Excepteur sint occaecat velit</li>
                      </ul>
                    </div>
                  </div>
                  <div className="pricing-item-cta mb-8">
                    <Button tag="a" color="primary" wide href="http://cruip.com/">Start free trial</Button>
                  </div>
                </div>
              </div>

              <div className="tiles-item reveal-scale-up" data-reveal-delay="200">
                <div className="tiles-item-inner has-shadow">
                  <div className="pricing-item-content">
                    <div className="pricing-item-header pb-16 mb-24">
                      <div className="pricing-item-price mb-4">
                        <span className="pricing-item-price-currency h2 text-color-low">$</span>
                        <span className="pricing-item-price-amount h1">{this.state.pricingSwitchOn ? '67' : '75'}</span>
                      </div>
                      <div className="text-color-low text-xs">
                        /month, billed {this.state.pricingSwitchOn ? 'annually' : 'monthly'}
                      </div>
                      <Image className="pricing-item-icon" src={require('./../../assets/images/pricing-icon.svg')} alt="Diamond" width={38} height={40} />
                    </div>
                    <div className="pricing-item-features mb-40">
                      <div className="pricing-item-features-title fw-500 text-xs text-color-high mb-24">
                        What's included
                      </div>
                      <ul className="pricing-item-features-list list-reset text-xs mb-32">
                        <li className="is-checked">Excepteur sint occaecat velit</li>
                        <li className="is-checked">Excepteur sint occaecat velit</li>
                        <li className="is-checked">Excepteur sint occaecat velit</li>
                        <li className="is-checked">Excepteur sint occaecat velit</li>
                        <li>Excepteur sint occaecat velit</li>
                      </ul>
                    </div>
                  </div>
                  <div className="pricing-item-cta mb-8">
                    <Button tag="a" color="secondary" wide href="http://cruip.com/">Start free trial</Button>
                  </div>
                </div>
              </div>

              <div className="tiles-item reveal-scale-up" data-reveal-delay="200">
                <div className="tiles-item-inner has-shadow">
                  <div className="pricing-item-content">
                    <div className="pricing-item-header pb-16 mb-24">
                      <div className="pricing-item-price mb-4">
                        <span className="pricing-item-price-currency h2 text-color-low">$</span>
                        <span className="pricing-item-price-amount h1">{this.state.pricingSwitchOn ? '97' : '109'}</span>
                      </div>
                      <div className="text-color-low text-xs">
                        /month, billed {this.state.pricingSwitchOn ? 'annually' : 'monthly'}
                      </div>
                    </div>
                    <div className="pricing-item-features mb-40">
                      <div className="pricing-item-features-title fw-500 text-xs text-color-high mb-24">
                        What's included
                      </div>
                      <ul className="pricing-item-features-list list-reset text-xs mb-32">
                        <li className="is-checked">Excepteur sint occaecat velit</li>
                        <li className="is-checked">Excepteur sint occaecat velit</li>
                        <li className="is-checked">Excepteur sint occaecat velit</li>
                        <li className="is-checked">Excepteur sint occaecat velit</li>
                        <li className="is-checked">Excepteur sint occaecat velit</li>
                      </ul>
                    </div>
                  </div>
                  <div className="pricing-item-cta mb-8">
                    <Button tag="a" color="primary" wide href="http://cruip.com/">Start free trial</Button>
                  </div>
                </div>
              </div>                            

            </div>
          </div>
        </div>
      </section>
    );
  }
}

Pricing.propTypes = propTypes;
Pricing.defaultProps = defaultProps;

export default Pricing;