using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace CrossOverBack.Models;

public partial class CrossOverContext : DbContext
{
    public CrossOverContext()
    {
    }

    public CrossOverContext(DbContextOptions<CrossOverContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Cart> Carts { get; set; }

    public virtual DbSet<Category> Categories { get; set; }

    public virtual DbSet<Client> Clients { get; set; }

    public virtual DbSet<Color> Colors { get; set; }

    public virtual DbSet<Order> Orders { get; set; }

    public virtual DbSet<OrdersProduct> OrdersProducts { get; set; }

    public virtual DbSet<Packet> Packets { get; set; }

    public virtual DbSet<Product> Products { get; set; }

    public virtual DbSet<Role> Roles { get; set; }

    public virtual DbSet<SectionType> SectionTypes { get; set; }

    public virtual DbSet<Status> Statuses { get; set; }

    public virtual DbSet<Window> Windows { get; set; }

    public virtual DbSet<WindowRequest> WindowRequests { get; set; }

    public virtual DbSet<WindowSection> WindowSections { get; set; }

    public virtual DbSet<WindowType> WindowTypes { get; set; }

    public virtual DbSet<Worker> Workers { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseNpgsql("host=146.190.29.77;port=5432;username=admin;password=admin;database=cross_over;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Cart>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("card_pkey");

            entity.ToTable("cart");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.ClientId).HasColumnName("client_id");
            entity.Property(e => e.Count)
                .HasDefaultValueSql("1")
                .HasColumnName("count");
            entity.Property(e => e.ProductId).HasColumnName("product_id");

            entity.HasOne(d => d.Client).WithMany(p => p.Carts)
                .HasForeignKey(d => d.ClientId)
                .HasConstraintName("card_client_id_fkey");

            entity.HasOne(d => d.Product).WithMany(p => p.Carts)
                .HasForeignKey(d => d.ProductId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("card_product_id_fkey");
        });

        modelBuilder.Entity<Category>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("category_pkey");

            entity.ToTable("category");

            entity.HasIndex(e => e.Name, "category_name_key").IsUnique();

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Name)
                .HasMaxLength(150)
                .HasColumnName("name");
        });

        modelBuilder.Entity<Client>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("client_pkey");

            entity.ToTable("client");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.BirthDate).HasColumnName("birth_date");
            entity.Property(e => e.Email)
                .HasMaxLength(250)
                .HasColumnName("email");
            entity.Property(e => e.FullName)
                .HasMaxLength(250)
                .HasColumnName("full_name");
            entity.Property(e => e.Login).HasColumnName("login");
            entity.Property(e => e.Password).HasColumnName("password");
            entity.Property(e => e.Phone)
                .HasMaxLength(15)
                .HasColumnName("phone");
        });

        modelBuilder.Entity<Color>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("color_pkey");

            entity.ToTable("color");

            entity.HasIndex(e => e.Name, "color_name_key").IsUnique();

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Name)
                .HasColumnType("character varying")
                .HasColumnName("name");
        });

        modelBuilder.Entity<Order>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("orders_pkey");

            entity.ToTable("orders");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.ClientId).HasColumnName("client_id");
            entity.Property(e => e.Date)
                .HasDefaultValueSql("now()")
                .HasColumnName("date");
            entity.Property(e => e.StatusId).HasColumnName("status_id");

            entity.HasOne(d => d.Client).WithMany(p => p.Orders)
                .HasForeignKey(d => d.ClientId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("orders_client_id_fkey");

            entity.HasOne(d => d.Status).WithMany(p => p.Orders)
                .HasForeignKey(d => d.StatusId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("orders_status_id_fkey");
        });

        modelBuilder.Entity<OrdersProduct>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("orders_products_pkey");

            entity.ToTable("orders_products");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Count)
                .HasDefaultValueSql("1")
                .HasColumnName("count");
            entity.Property(e => e.OrderId).HasColumnName("order_id");
            entity.Property(e => e.ProductId).HasColumnName("product_id");

            entity.HasOne(d => d.Order).WithMany(p => p.OrdersProducts)
                .HasForeignKey(d => d.OrderId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("orders_products_order_id_fkey");

            entity.HasOne(d => d.Product).WithMany(p => p.OrdersProducts)
                .HasForeignKey(d => d.ProductId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("orders_products_product_id_fkey");
        });

        modelBuilder.Entity<Packet>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("packet_pkey");

            entity.ToTable("packet");

            entity.HasIndex(e => e.Name, "packet_name_key").IsUnique();

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Name)
                .HasColumnType("character varying")
                .HasColumnName("name");
        });

        modelBuilder.Entity<Product>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("product_pkey");

            entity.ToTable("product");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CategoryId).HasColumnName("category_id");
            entity.Property(e => e.Description).HasColumnName("description");
            entity.Property(e => e.Image).HasColumnName("image");
            entity.Property(e => e.Name).HasColumnName("name");
            entity.Property(e => e.Price).HasColumnName("price");

            entity.HasOne(d => d.Category).WithMany(p => p.Products)
                .HasForeignKey(d => d.CategoryId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("product_category_id_fkey");
        });

        modelBuilder.Entity<Role>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("role_pkey");

            entity.ToTable("role");

            entity.HasIndex(e => e.Name, "role_name_key").IsUnique();

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Name)
                .HasMaxLength(150)
                .HasColumnName("name");
        });

        modelBuilder.Entity<SectionType>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("section_type_pkey");

            entity.ToTable("section_type");

            entity.HasIndex(e => e.Name, "section_type_name_key").IsUnique();

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Name)
                .HasColumnType("character varying")
                .HasColumnName("name");
        });

        modelBuilder.Entity<Status>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("status_pkey");

            entity.ToTable("status");

            entity.HasIndex(e => e.Name, "status_name_key").IsUnique();

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Name).HasColumnName("name");
        });

        modelBuilder.Entity<Window>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("windows_pkey");

            entity.ToTable("windows");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Color).HasColumnName("color");
            entity.Property(e => e.HasLattice).HasColumnName("has_lattice");
            entity.Property(e => e.HasWindowsill).HasColumnName("has_windowsill");
            entity.Property(e => e.Height).HasColumnName("height");
            entity.Property(e => e.Packet).HasColumnName("packet");
            entity.Property(e => e.Width).HasColumnName("width");
            entity.Property(e => e.WindowType).HasColumnName("window_type");

            entity.HasOne(d => d.ColorNavigation).WithMany(p => p.Windows)
                .HasForeignKey(d => d.Color)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("windows_color_fkey");

            entity.HasOne(d => d.PacketNavigation).WithMany(p => p.Windows)
                .HasForeignKey(d => d.Packet)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("windows_packet_fkey");

            entity.HasOne(d => d.WindowTypeNavigation).WithMany(p => p.Windows)
                .HasForeignKey(d => d.WindowType)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("windows_window_type_fkey");
        });

        modelBuilder.Entity<WindowRequest>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("window_request_pkey");

            entity.ToTable("window_request");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.City).HasColumnName("city");
            entity.Property(e => e.Date)
                .HasDefaultValueSql("now()")
                .HasColumnName("date");
            entity.Property(e => e.Description).HasColumnName("description");
            entity.Property(e => e.Email).HasColumnName("email");
            entity.Property(e => e.Name).HasColumnName("name");
            entity.Property(e => e.Phone).HasColumnName("phone");
            entity.Property(e => e.WindowId).HasColumnName("window_id");

            entity.HasOne(d => d.Window).WithMany(p => p.WindowRequests)
                .HasForeignKey(d => d.WindowId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("window_request_window_id_fkey");
        });

        modelBuilder.Entity<WindowSection>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("window_sections_pkey");

            entity.ToTable("window_sections");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.SectionType).HasColumnName("section_type");
            entity.Property(e => e.WindowId).HasColumnName("window_id");

            entity.HasOne(d => d.SectionTypeNavigation).WithMany(p => p.WindowSections)
                .HasForeignKey(d => d.SectionType)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("window_sections_section_type_fkey");

            entity.HasOne(d => d.Window).WithMany(p => p.WindowSections)
                .HasForeignKey(d => d.WindowId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("window_sections_window_id_fkey");
        });

        modelBuilder.Entity<WindowType>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("window_type_pkey");

            entity.ToTable("window_type");

            entity.HasIndex(e => e.Name, "window_type_name_key").IsUnique();

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Name)
                .HasColumnType("character varying")
                .HasColumnName("name");
        });

        modelBuilder.Entity<Worker>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("worker_pkey");

            entity.ToTable("worker");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Login)
                .HasMaxLength(150)
                .HasColumnName("login");
            entity.Property(e => e.Name)
                .HasMaxLength(250)
                .HasColumnName("name");
            entity.Property(e => e.Password).HasColumnName("password");
            entity.Property(e => e.RoleId).HasColumnName("role_id");

            entity.HasOne(d => d.Role).WithMany(p => p.Workers)
                .HasForeignKey(d => d.RoleId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("worker_role_id_fkey");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
