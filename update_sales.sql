-- Add total_sales column
ALTER TABLE public.clients ADD COLUMN IF NOT EXISTS total_sales decimal(10,2) DEFAULT 0.00;

-- Update existing clients
UPDATE public.clients SET total_sales = 2220 WHERE name = 'ONLINE';
UPDATE public.clients SET total_sales = 8880 WHERE name = 'بيغ بايت';
UPDATE public.clients SET total_sales = 32460 WHERE name = 'شاشليشني';
UPDATE public.clients SET total_sales = 26400 WHERE name = 'مراش';
UPDATE public.clients SET total_sales = 87465 WHERE name = 'سونون';
UPDATE public.clients SET total_sales = 29030 WHERE name = '135';
UPDATE public.clients SET total_sales = 50150 WHERE name = 'بايراق';
UPDATE public.clients SET total_sales = 24245 WHERE name = 'كورداك';
UPDATE public.clients SET total_sales = 11040 WHERE name = 'ايل';
UPDATE public.clients SET total_sales = 15000 WHERE name = 'تودور';
UPDATE public.clients SET total_sales = 1480 WHERE name = 'pollen';
UPDATE public.clients SET total_sales = 11685 WHERE name = 'شاشليك';
UPDATE public.clients SET total_sales = 7905 WHERE name = 'وود';
UPDATE public.clients SET total_sales = 13245 WHERE name = 'كافينيي';
UPDATE public.clients SET total_sales = 0 WHERE name = 'بينوتشي';
UPDATE public.clients SET total_sales = 3630 WHERE name = 'ice';
UPDATE public.clients SET total_sales = 25980 WHERE name = 'تايمين';
UPDATE public.clients SET total_sales = 2190 WHERE name = 'لونا';
UPDATE public.clients SET total_sales = 11210 WHERE name = 'فارينتشايا';
UPDATE public.clients SET total_sales = 3055 WHERE name = 'كافيار';
UPDATE public.clients SET total_sales = 0 WHERE name = 'زيرنو 2';
UPDATE public.clients SET total_sales = 57135 WHERE name = 'سيلينتانا 2';
UPDATE public.clients SET total_sales = 5980 WHERE name = 'زيرنو 1';
UPDATE public.clients SET total_sales = 8850 WHERE name = 'زيرنو 3';
UPDATE public.clients SET total_sales = 5385 WHERE name = 'bey';
UPDATE public.clients SET total_sales = 40200 WHERE name = 'زادة';

-- Insert '4' if it doesn't exist (using a DO block to avoid errors if it exists)
DO $$
BEGIN
   IF NOT EXISTS (SELECT FROM public.clients WHERE name = '4') THEN
      INSERT INTO public.clients (name, total_sales, balance, address, phone)
      VALUES ('4', 13915, 0, 'Unknown', '');
   ELSE
      UPDATE public.clients SET total_sales = 13915 WHERE name = '4';
   END IF;
END
$$;
