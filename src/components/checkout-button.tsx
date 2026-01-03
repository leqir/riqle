'use client';

import { useState } from 'react';
import { api } from '@/trpc/react';

interface CheckoutButtonProps {
  productId: string;
  priceId: string;
  productName: string;
  price: number;
  currency: string;
  className?: string;
  disabled?: boolean;
}

/**
 * Checkout Button Component
 *
 * This component handles the client-side checkout flow:
 * 1. Calls tRPC mutation to create Stripe Checkout Session
 * 2. Redirects user to Stripe's hosted checkout page
 * 3. Handles loading and error states
 *
 * Usage:
 * <CheckoutButton
 *   productId="clxxx"
 *   priceId="clyyy"
 *   productName="My Product"
 *   price={9900}
 *   currency="USD"
 * />
 */
export function CheckoutButton({
  productId,
  priceId,
  productName,
  price,
  currency,
  className = '',
  disabled = false,
}: CheckoutButtonProps) {
  const [isRedirecting, setIsRedirecting] = useState(false);

  const createSession = api.checkout.createSession.useMutation({
    onSuccess: (data) => {
      // Redirect to Stripe Checkout
      if (data.url) {
        setIsRedirecting(true);
        window.location.href = data.url;
      } else {
        console.error('No checkout URL returned');
        setIsRedirecting(false);
      }
    },
    onError: (error) => {
      console.error('Checkout error:', error);
      setIsRedirecting(false);
      // Error will be displayed by error state below
    },
  });

  const handleCheckout = () => {
    createSession.mutate({ productId, priceId });
  };

  const isLoading = createSession.isPending || isRedirecting;
  const formattedPrice = formatPrice(price, currency);

  return (
    <div className="space-y-4">
      <button
        onClick={handleCheckout}
        disabled={disabled || isLoading}
        className={`w-full rounded-lg px-6 py-3 font-semibold text-white transition-all duration-200 ${
          disabled || isLoading
            ? 'cursor-not-allowed bg-gray-400'
            : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 active:scale-95'
        } ${className} `}
        aria-label={`Purchase ${productName} for ${formattedPrice}`}
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <svg
              className="h-5 w-5 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            {isRedirecting ? 'Redirecting to checkout...' : 'Creating session...'}
          </span>
        ) : (
          <span className="flex items-center justify-center gap-2">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            Purchase for {formattedPrice}
          </span>
        )}
      </button>

      {createSession.isError && (
        <div className="rounded-md border border-red-200 bg-red-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Checkout Error</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{createSession.error.message}</p>
              </div>
              <div className="mt-4">
                <button
                  type="button"
                  onClick={() => createSession.reset()}
                  className="rounded-md bg-red-100 px-3 py-2 text-sm font-medium text-red-800 hover:bg-red-200"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="text-center text-xs text-gray-500">
        <div className="flex items-center justify-center gap-2">
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
          </svg>
          <span>Secure checkout powered by Stripe</span>
        </div>
      </div>
    </div>
  );
}

/**
 * Minimal checkout button variant for inline usage
 */
export function CheckoutButtonMinimal({
  productId,
  priceId,
  label = 'Buy Now',
  className = '',
}: {
  productId: string;
  priceId: string;
  label?: string;
  className?: string;
}) {
  const [isRedirecting, setIsRedirecting] = useState(false);

  const createSession = api.checkout.createSession.useMutation({
    onSuccess: (data) => {
      if (data.url) {
        setIsRedirecting(true);
        window.location.href = data.url;
      }
    },
  });

  const handleClick = () => {
    createSession.mutate({ productId, priceId });
  };

  const isLoading = createSession.isPending || isRedirecting;

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className={`inline-flex items-center gap-2 rounded-md px-4 py-2 font-medium text-white transition-colors ${
        isLoading ? 'cursor-not-allowed bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'
      } ${className} `}
    >
      {isLoading ? (
        <>
          <svg
            className="h-4 w-4 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Loading...
        </>
      ) : (
        label
      )}
    </button>
  );
}

/**
 * Format price from cents to display string
 */
function formatPrice(amountInCents: number, currency: string): string {
  const amount = amountInCents / 100;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount);
}
