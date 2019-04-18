-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Máy chủ: localhost
-- Thời gian đã tạo: Th4 16, 2019 lúc 10:28 AM
-- Phiên bản máy phục vụ: 10.1.38-MariaDB
-- Phiên bản PHP: 7.3.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `banhang`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `catalogs`
--

CREATE TABLE `catalogs` (
  `id` int(11) NOT NULL,
  `name` varchar(300) COLLATE utf8_unicode_ci NOT NULL,
  `avatar` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `id_parent` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `catalogs`
--

INSERT INTO `catalogs` (`id`, `name`, `avatar`, `id_parent`) VALUES
(1, 'áo sơ mi', '', 0),
(2, 'áo thun nam', '', 0),
(3, 'quần nam', '', 0),
(4, 'giày da', '', 0),
(5, 'phụ kiện', '', 0),
(6, 'sp mùa đông', '', 0),
(7, 'Sơ mi ngắn tay', '', 1),
(8, 'Sơ mi dài tay', '', 1),
(9, 'Áo chống nắng', '', 1),
(10, 'Áo polo', '', 2),
(11, 'Áo thun không cổ', '', 2),
(12, 'Quần Jeans', '', 3),
(13, 'Quần kaki', '', 3),
(14, 'Quần Sort', '', 3),
(15, 'Quần âu, Quần vải', '', 3),
(16, 'Thắt lưng', '', 5),
(17, 'Túi xách', '', 5),
(18, 'Ví da ', '', 5),
(19, 'Khăn quàng, găng tay, mũ len', '', 5),
(20, 'Đồ lót nam', '', 5),
(21, 'Áo gió', '', 6),
(22, 'Áo phao', '', 6),
(23, 'Áo khoác nam', '', 6),
(24, 'Áo khoác nỉ', '', 6),
(25, 'Áo khoác bò', '', 6),
(26, 'Áo măng tô', '', 6),
(27, 'Áo da', '', 6),
(28, 'Áo thun, áo len, áo nỉ', '', 6),
(29, 'Áo kaki', '', 6),
(30, 'Áo đôi', '', 6);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `facebook_accounts`
--

CREATE TABLE `facebook_accounts` (
  `id_user_profile` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `id_facebook` varchar(500) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `google_accounts`
--

CREATE TABLE `google_accounts` (
  `id_user_profile` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `id_google` varchar(500) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `id_user` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `status` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `total` int(11) NOT NULL,
  `create_time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `order_detailts`
--

CREATE TABLE `order_detailts` (
  `id` int(11) NOT NULL,
  `id_product` int(11) NOT NULL,
  `id_color` int(11) NOT NULL,
  `id_size` int(11) NOT NULL,
  `id_order` int(11) NOT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `id_catalog` int(11) NOT NULL,
  `name` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `image` varchar(300) COLLATE utf8_unicode_ci NOT NULL,
  `price` int(11) NOT NULL,
  `rating` int(11) NOT NULL,
  `description` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `products`
--

INSERT INTO `products` (`id`, `id_catalog`, `name`, `image`, `price`, `rating`, `description`) VALUES
(1, 7, 'Áo sơ mi nam in 3D', 'https://h2tshop.com/media/product/2556_14_2.jpg', 120000, 0, 0),
(2, 7, 'Sơ mi cộc tay vẩy sơn', 'https://h2tshop.com/media/product/2541_13_1.jpg', 150000, 0, 0),
(3, 8, 'Sơ mi Flannel nam ', 'https://h2tshop.com/media/product/2563_11_2.jpg', 1300000, 0, 0),
(4, 8, '\r\nChia sẻ với:\r\nSơ mi nam kẻ sọc', 'https://h2tshop.com/media/product/2550____nh_b__a.png', 300000, 0, 0),
(5, 9, 'Áo Chống Nắng Cao Cấp', 'https://h2tshop.com/media/product/2579_2.png', 1300000, 0, 0),
(6, 10, 'Áo Polo Nam', 'https://h2tshop.com/media/product/2551_0db2ed99df783d266469.jpg', 150000, 0, 0),
(7, 10, 'Áo polo cá sấu', 'https://h2tshop.com/media/product/2574__mg_0208.JPG', 120000, 0, 0),
(8, 11, 'Áo thun nam cổ tròn', 'https://h2tshop.com/media/product/2548_5_3.jpg', 150000, 0, 0),
(9, 11, 'Áo thun nam họa tiết', 'https://h2tshop.com/media/product/2577_9013240951_1058991706.jpg', 150000, 0, 0),
(10, 12, 'Quần jean rách gố', 'https://h2tshop.com/media/product/2578__mg_0277.JPG', 1300000, 0, 0),
(11, 12, 'Quần Jean Nam', 'https://h2tshop.com/media/product/2384_286f5d160497e6c9bf86.jpg', 350000, 0, 0),
(12, 13, 'Quần Kaki nam', 'https://h2tshop.com/media/product/2378_1.jpg', 340000, 0, 0),
(13, 13, 'Quần hộp kaki', 'https://h2tshop.com/media/product/2520_4_3.jpg', 150000, 0, 0),
(14, 14, 'Quần Short Nam', 'https://h2tshop.com/media/product/2573_266386065db0bfeee6a1.jpg', 120000, 0, 0),
(15, 14, 'Quần Short Jean', 'https://h2tshop.com/media/product/2543_7e93ae981c4efe10a75f.jpg', 300000, 0, 0),
(16, 15, 'Quần Âu Công Sở', 'https://h2tshop.com/media/product/2567__mg_9456.JPG', 120000, 0, 0),
(17, 15, 'Quần vải lót lông', 'https://h2tshop.com/media/product/2488_22_1.jpg', 300000, 0, 0),
(18, 16, 'Thắt lưng da nam', 'https://h2tshop.com/media/product/120_2340_2_1.jpg', 340000, 0, 0),
(19, 16, 'Thắt lưng da bò', 'https://h2tshop.com/media/product/2355_9_1.jpg', 150000, 0, 0),
(20, 17, 'Túi đeo vải dù quai chéo', 'https://h2tshop.com/media/product/2590_7_1.jpg', 1300000, 0, 0),
(21, 17, 'Balo vải dù ', 'https://h2tshop.com/media/product/2585_3_1.jpg', 350000, 0, 0),
(22, 18, 'Ví da nam ', 'https://h2tshop.com/media/product/2354_7_1.jpg', 120000, 0, 0),
(23, 18, 'Ví Da NamCD', 'https://h2tshop.com/media/product/2087_2690833179_825355906.jpg', 150000, 0, 0),
(24, 19, 'Găng tay da lót nỉ', 'https://h2tshop.com/media/product/2498_32_4.jpg', 120000, 0, 0),
(25, 19, 'Combo khăn mũ ', 'https://h2tshop.com/media/product/2486_28_1.jpg', 150000, 0, 0),
(26, 20, 'Quần Lót Nam', 'https://h2tshop.com/media/product/2029_h17bb17113_sa01_07.jpg', 120000, 0, 0),
(27, 20, 'Áo Ba Lỗ Nam', 'https://h2tshop.com/media/product/2027_h17tt17120_sa01_02_1.jpg', 150000, 0, 0),
(28, 21, 'Áo gió nam lót lông ', 'https://h2tshop.com/media/product/2381_111.jpg', 1300000, 0, 0),
(29, 21, 'Áo khoác mũ lông cao', 'https://h2tshop.com/media/product/2442_34_1.jpg', 3000000, 0, 0),
(30, 22, 'Áo phao nam', 'https://h2tshop.com/media/product/2413_7_2.jpg', 120000, 0, 0),
(31, 22, 'Áo phao nam HP', 'https://h2tshop.com/media/product/2402_9_1.jpg', 150000, 0, 0),
(32, 23, 'Áo choàng lót lông', 'https://h2tshop.com/media/product/1695_10_1.jpg', 120000, 0, 0),
(33, 23, 'Áo khoác mũ lông 2', 'https://h2tshop.com/media/product/2442_34_1.jpg', 1500000, 0, 0),
(34, 24, 'Hoodie nỉ vân', 'https://h2tshop.com/media/product/2365_4_1.jpg', 1300000, 0, 0),
(35, 24, 'Hoodie nỉ lót lông', 'https://h2tshop.com/media/product/2467_5_1.jpg', 350000, 0, 0),
(36, 25, 'Áo Khoác Bò ', 'https://h2tshop.com/media/product/2186_41_1.jpg', 120000, 0, 0),
(37, 25, 'Áo bò lót lông', 'https://h2tshop.com/media/product/2416_32_2.jpg', 300000, 0, 0),
(38, 26, 'Măng tô dạ lót nỉ', 'https://h2tshop.com/media/product/1656_5266115074_1904992840.jpg', 1300000, 0, 0),
(39, 26, 'Măng tô dạ cao cấp', 'https://h2tshop.com/media/product/120_2451_b__a.png', 300000, 0, 0),
(40, 27, 'Áo da lộn cổ lông', 'https://h2tshop.com/media/product/2481_18_1.jpg', 1300000, 0, 0),
(41, 27, 'Áo da nam', 'https://h2tshop.com/media/product/2400_5_1.jpg', 350000, 0, 0),
(42, 28, 'Áo len vân', 'https://h2tshop.com/media/product/2514_1_4.jpg', 120000, 0, 0),
(43, 28, 'Áo len vân cao cổ ', 'https://h2tshop.com/media/product/2410_11_5.jpg', 3000000, 0, 0),
(44, 29, 'Áo khoác kaki nam lót lông', 'https://h2tshop.com/media/product/1705_9_1.jpg', 1300000, 0, 0),
(45, 29, 'Áo khoác choàng lót lông', 'https://h2tshop.com/media/product/1638_14_5.jpg', 1500000, 0, 0),
(46, 30, 'Áo khoác đôi lót lông', 'https://h2tshop.com/media/product/2431_7_1.jpg', 1300000, 0, 0),
(47, 30, 'Áo khoác kaki đôi', 'https://h2tshop.com/media/product/2429_vf.png', 1500000, 0, 0),
(48, 4, 'Boots da nam cao cấp', 'https://h2tshop.com/media/product/2476_1_1.jpg', 120000, 0, 0),
(49, 4, 'Giầy Da Nam ', 'https://h2tshop.com/media/product/1838_994_2.jpg', 150000, 0, 0),
(50, 4, 'Giày da nam', 'https://h2tshop.com/media/product/1702_giay_254.jpg', 1300000, 0, 0);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `products_colors`
--

CREATE TABLE `products_colors` (
  `id` int(11) NOT NULL,
  `src_image` varchar(300) COLLATE utf8_unicode_ci NOT NULL,
  `id_product` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `products_color_sizes`
--

CREATE TABLE `products_color_sizes` (
  `id_product_color` int(11) NOT NULL,
  `id_product_size` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `products_sizes`
--

CREATE TABLE `products_sizes` (
  `id` int(11) NOT NULL,
  `name` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `user_accounts`
--

CREATE TABLE `user_accounts` (
  `id_user_profile` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(300) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(500) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `user_profiles`
--

CREATE TABLE `user_profiles` (
  `id` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `display_name` varchar(300) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(200) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `catalogs`
--
ALTER TABLE `catalogs`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `facebook_accounts`
--
ALTER TABLE `facebook_accounts`
  ADD PRIMARY KEY (`id_user_profile`);

--
-- Chỉ mục cho bảng `google_accounts`
--
ALTER TABLE `google_accounts`
  ADD PRIMARY KEY (`id_user_profile`);

--
-- Chỉ mục cho bảng `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_user` (`id_user`);

--
-- Chỉ mục cho bảng `order_detailts`
--
ALTER TABLE `order_detailts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_color` (`id_color`),
  ADD KEY `id_order` (`id_order`),
  ADD KEY `id_product` (`id_product`),
  ADD KEY `id_size` (`id_size`);

--
-- Chỉ mục cho bảng `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `products_ibfk_1` (`id_catalog`);

--
-- Chỉ mục cho bảng `products_colors`
--
ALTER TABLE `products_colors`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_product` (`id_product`);

--
-- Chỉ mục cho bảng `products_color_sizes`
--
ALTER TABLE `products_color_sizes`
  ADD PRIMARY KEY (`id_product_color`,`id_product_size`),
  ADD KEY `id_product_size` (`id_product_size`);

--
-- Chỉ mục cho bảng `products_sizes`
--
ALTER TABLE `products_sizes`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `user_accounts`
--
ALTER TABLE `user_accounts`
  ADD PRIMARY KEY (`id_user_profile`);

--
-- Chỉ mục cho bảng `user_profiles`
--
ALTER TABLE `user_profiles`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `catalogs`
--
ALTER TABLE `catalogs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT cho bảng `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `order_detailts`
--
ALTER TABLE `order_detailts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT cho bảng `products_colors`
--
ALTER TABLE `products_colors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `products_sizes`
--
ALTER TABLE `products_sizes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `facebook_accounts`
--
ALTER TABLE `facebook_accounts`
  ADD CONSTRAINT `facebook_accounts_ibfk_1` FOREIGN KEY (`id_user_profile`) REFERENCES `user_profiles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `google_accounts`
--
ALTER TABLE `google_accounts`
  ADD CONSTRAINT `google_accounts_ibfk_1` FOREIGN KEY (`id_user_profile`) REFERENCES `user_profiles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user_profiles` (`id`);

--
-- Các ràng buộc cho bảng `order_detailts`
--
ALTER TABLE `order_detailts`
  ADD CONSTRAINT `order_detailts_ibfk_1` FOREIGN KEY (`id_color`) REFERENCES `products_colors` (`id`),
  ADD CONSTRAINT `order_detailts_ibfk_2` FOREIGN KEY (`id_order`) REFERENCES `orders` (`id`),
  ADD CONSTRAINT `order_detailts_ibfk_3` FOREIGN KEY (`id_product`) REFERENCES `products` (`id`),
  ADD CONSTRAINT `order_detailts_ibfk_4` FOREIGN KEY (`id_size`) REFERENCES `products_sizes` (`id`);

--
-- Các ràng buộc cho bảng `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`id_catalog`) REFERENCES `catalogs` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `products_colors`
--
ALTER TABLE `products_colors`
  ADD CONSTRAINT `products_colors_ibfk_1` FOREIGN KEY (`id_product`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `products_color_sizes`
--
ALTER TABLE `products_color_sizes`
  ADD CONSTRAINT `products_color_sizes_ibfk_1` FOREIGN KEY (`id_product_color`) REFERENCES `products_colors` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `products_color_sizes_ibfk_2` FOREIGN KEY (`id_product_size`) REFERENCES `products_sizes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `user_accounts`
--
ALTER TABLE `user_accounts`
  ADD CONSTRAINT `user_accounts_ibfk_1` FOREIGN KEY (`id_user_profile`) REFERENCES `user_profiles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
